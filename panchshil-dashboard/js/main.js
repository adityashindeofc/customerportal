/**
 * main.js
 * ---------------------------------------------------------------------------
 * Bootstrap, state and interaction wiring.
 *
 * Interaction model: one delegated click listener reads [data-action="…"]
 * and calls the matching handler in `actions`. To add a button, give it
 * data-action="my-action" and add `'my-action'(el) { … }` below.
 * ---------------------------------------------------------------------------
 */
(function (PCP) {
  'use strict';

  const { config, api, render } = PCP;

  /* ---- DOM references --------------------------------------------------- */
  const dom = {
    modal:      document.querySelector('[data-modal]'),
    modalTitle: document.querySelector('[data-slot="modal-title"]'),
    modalBody:  document.querySelector('[data-slot="modal-body"]'),
    toast:      document.querySelector('[data-toast]'),
    dateForm:   document.querySelector('[data-form="date-range"]'),
    property:   document.querySelector('[data-slot="property-select"]')
  };

  /* ---- State ------------------------------------------------------------ */
  const state = {
    range:      { ...config.defaultRange },
    propertyId: null,
    data:       null
  };

  /* ---- UI utilities ----------------------------------------------------- */

  let toastTimer;
  function showToast(message, duration = 3000) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dom.toast.classList.remove('is-visible'), duration);
  }

  function openModal(title, nodes) {
    dom.modalTitle.textContent = title;
    dom.modalBody.replaceChildren(...nodes);
    dom.modal.showModal();
    dom.modalBody.querySelector('select, input, textarea')?.focus();
  }

  function closeModal() {
    dom.modal.close();
  }

  /* ---- Data ------------------------------------------------------------- */

  async function loadDashboard() {
    try {
      state.data = await api.getDashboard({ ...state.range, propertyId: state.propertyId });
      state.propertyId = state.data.property.id;
      render.dashboard(state.data, state.range);
    } catch (error) {
      console.error('[PCP] Failed to load dashboard', error);
      showToast('Couldn’t load your dashboard. Please try again.');
    }
  }

  /* ---- Action handlers -------------------------------------------------- */

  const actions = {

    'new-ticket'()  { openModal(config.ticketForm.title, render.modalRequestForm('ticket')); },
    'new-permit'()  { openModal(config.permitForm.title, render.modalRequestForm('permit')); },
    'close-modal'() { closeModal(); },

    /** Click on a metric tile. */
    'view-status'(trigger) {
      const { group, key } = trigger.dataset;
      const statuses = group === 'tickets' ? config.ticketStatuses : config.permitStatuses;
      const status   = statuses.find((s) => s.key === key);
      const count    = state.data?.[group]?.[key] ?? 0;
      const noun     = group === 'tickets' ? 'tickets' : 'permits';
      const period   = `${render.formatDate(state.range.from)} – ${render.formatDate(state.range.to)}`;

      // TODO (integration): navigate to the filtered list instead, e.g.
      // window.location.href = `/${group}?status=${key}&from=${state.range.from}&to=${state.range.to}`;
      openModal(`${status.label} ${noun}`, render.modalStatus({
        label:   status.label,
        count,
        message: count
          ? `${count} ${status.label.toLowerCase()} ${noun} for ${period}.`
          : `No ${status.label.toLowerCase()} ${noun} for ${period}.`
      }));
    },

    /** Download ticket + permit summary as CSV. */
    'export'() {
      if (!state.data) return;

      const rows = [
        ['Section', 'Status', 'Count'],
        ...config.ticketStatuses.map((s) => ['Tickets', s.label, state.data.tickets[s.key] ?? 0]),
        ...config.permitStatuses.map((s) => ['Permits', s.label, state.data.permits[s.key] ?? 0])
      ];
      const csv  = rows.map((row) => row.join(',')).join('\r\n');
      const url  = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
      const link = Object.assign(document.createElement('a'), {
        href: url,
        download: `panchshil-overview_${state.range.from}_${state.range.to}.csv`
      });

      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Summary exported');
    },

    'open-account'() {
      // TODO (integration): replace with the existing account menu (profile, sign out).
      openModal('Your account', render.modalText(`${state.data?.user.name ?? ''} · Customer portal`));
    }
  };

  /* ---- Event wiring ----------------------------------------------------- */

  // Delegated [data-action] clicks
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action]');
    if (!trigger) return;
    actions[trigger.dataset.action]?.(trigger, event);
  });

  // Navigation ([data-nav]) — hash-based placeholder; replace with the site router
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-nav]');
    if (!link) return;

    const target = link.dataset.nav;

    document.querySelectorAll('.nav__item').forEach((item) => {
      const active = item.dataset.nav === target;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'page');
      else        item.removeAttribute('aria-current');
    });

    if (target === 'dashboard') return;
    event.preventDefault();
    // TODO (integration): route to the real page, e.g. window.location.href = `/${target}`;
    showToast(`${link.textContent.replace(/[↗↓]/g, '').trim()} — connect to page route`);
  });

  // Close modal when clicking the backdrop
  dom.modal.addEventListener('click', (event) => {
    if (event.target === dom.modal) closeModal();
  });

  // Ticket / permit form submit (form is rendered dynamically → delegated)
  dom.modal.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-form="request"]');
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;

    const kind    = form.dataset.kind;
    const payload = Object.fromEntries(new FormData(form));
    const submit  = form.querySelector('[type="submit"]');
    submit.disabled = true;

    try {
      if (kind === 'permit') await api.createPermit(payload);
      else                   await api.createTicket(payload);

      closeModal();
      showToast(kind === 'permit' ? config.permitForm.successToast : config.ticketForm.successToast);
      loadDashboard();
    } catch (error) {
      console.error('[PCP] Submit failed', error);
      showToast('Something went wrong. Please try again.');
      submit.disabled = false;
    }
  });

  // Date range filter
  dom.dateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { from, to } = dom.dateForm.elements;
    const invalid = !from.value || !to.value || from.value > to.value;

    from.setAttribute('aria-invalid', String(invalid));
    to.setAttribute('aria-invalid', String(invalid));

    if (invalid) {
      showToast('Choose a valid date range. The start date must come first.');
      return;
    }

    state.range = { from: from.value, to: to.value };
    loadDashboard();
  });

  // Property switch
  dom.property.addEventListener('change', () => {
    state.propertyId = dom.property.value;
    loadDashboard();
  });

  /* ---- Init ------------------------------------------------------------- */

  dom.dateForm.elements.from.value = state.range.from;
  dom.dateForm.elements.to.value   = state.range.to;
  loadDashboard();

})(window.PCP = window.PCP || {});
