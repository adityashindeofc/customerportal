/**
 * render.js
 * ---------------------------------------------------------------------------
 * Pure rendering: takes data, writes DOM. No fetching and no event wiring
 * (see main.js). Nodes are built with the DOM API — data is never injected
 * through innerHTML, so values are XSS-safe.
 *
 * Exposes: window.PCP.render
 * ---------------------------------------------------------------------------
 */
(function (PCP) {
  'use strict';

  const { config } = PCP;

  /* ---- Helpers ---------------------------------------------------------- */

  /**
   * Element factory.
   * el('span', { class: 'x', dataset: { key: 'open' } }, 'text', childNode)
   */
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);

    Object.entries(attrs).forEach(([name, value]) => {
      if (value == null || value === false) return;
      if (name === 'class')        node.className = value;
      else if (name === 'dataset') Object.assign(node.dataset, value);
      else                         node.setAttribute(name, value === true ? '' : value);
    });

    children.flat().forEach((child) => {
      if (child == null) return;
      node.append(child instanceof Node ? child : String(child));
    });
    return node;
  }

  const slot = (name) => document.querySelector(`[data-slot="${name}"]`);

  /** Sets text on every [data-bind="key"] element. */
  function bind(key, value) {
    document.querySelectorAll(`[data-bind="${key}"]`).forEach((node) => {
      node.textContent = value;
    });
  }

  /** "29 Oct 2026" */
  function formatDate(iso) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }

  function greetingFor(date = new Date()) {
    const hour = date.getHours();
    if (hour < 12) return 'Good morning.';
    if (hour < 17) return 'Good afternoon.';
    return 'Good evening.';
  }

  /* ---- Header & hero ---------------------------------------------------- */

  function renderHeader(data) {
    bind('greeting', greetingFor());
    bind('property-name', data.property.name);
    bind('user-initials', data.user.initials);
    bind('aqi', data.aqi == null ? config.aqiFallback : Number(data.aqi).toFixed(1));
  }

  function renderProperties(properties, activeId) {
    const select = slot('property-select');
    select.replaceChildren(...properties.map((p) =>
      el('option', { value: p.id, selected: p.id === activeId }, p.name)
    ));
  }

  function renderRangeLabel(range) {
    bind('range-label', `Overview · ${formatDate(range.from)} – ${formatDate(range.to)}`);
  }

  /* ---- Metrics ---------------------------------------------------------- */

  /**
   * One metric tile.
   * @param {'tickets'|'permits'} group
   * @param {object} status   entry from config.ticketStatuses / permitStatuses
   * @param {number} count
   */
  function metric(group, status, count) {
    const noun = group === 'tickets' ? 'tickets' : 'permits';

    return el('li', {},
      el('button', {
          type: 'button',
          class: `metric${status.accent ? ' metric--accent' : ''}`,
          dataset: { action: 'view-status', group, key: status.key },
          'aria-label': `${status.label} ${noun}: ${count}`
        },
        el('span', { class: 'metric__label' }, status.label),
        el('span', { class: 'metric__value' }, count),
        status.hint ? el('span', { class: 'metric__hint' }, status.hint) : null,
        el('span', { class: 'metric__arrow', 'aria-hidden': 'true' }, '↗')
      )
    );
  }

  function renderTickets(tickets) {
    slot('ticket-metrics').replaceChildren(
      ...config.ticketStatuses.map((s) => metric('tickets', s, tickets[s.key] ?? 0))
    );
  }

  function renderPermits(permits) {
    slot('permit-metrics').replaceChildren(
      ...config.permitStatuses.map((s) => metric('permits', s, permits[s.key] ?? 0))
    );
  }

  /* ---- Modal content ---------------------------------------------------- */

  /** Status detail: one summary row + message. */
  function modalStatus({ label, count, message }) {
    return [
      el('div', { class: 'detail-row' },
        el('span', {}, label),
        el('strong', {}, count)
      ),
      el('p', { class: 'modal__text' }, message)
    ];
  }

  /** Simple text content. */
  function modalText(message) {
    return [el('p', { class: 'modal__text' }, message)];
  }

  /**
   * Ticket / permit request form.
   * @param {'ticket'|'permit'} kind
   */
  function modalRequestForm(kind) {
    const form = kind === 'permit' ? config.permitForm : config.ticketForm;

    return [
      el('form', { dataset: { form: 'request', kind }, novalidate: true },

        el('label', { class: 'field' }, form.typeLabel,
          el('select', { class: 'field__control', name: 'type', required: true },
            el('option', { value: '' }, 'Select an option'),
            form.types.map((t) => el('option', { value: t }, t))
          )
        ),

        el('label', { class: 'field' }, form.subjectLabel,
          el('input', {
            class: 'field__control', name: 'subject', required: true,
            maxlength: '120', placeholder: 'Briefly describe your request'
          })
        ),

        el('label', { class: 'field' }, 'Description',
          el('textarea', {
            class: 'field__control', name: 'description', required: true,
            maxlength: '2000', placeholder: 'Add details to help the property team'
          })
        ),

        el('div', { class: 'modal__actions' },
          el('button', { type: 'button', class: 'btn', dataset: { action: 'close-modal' } }, 'Cancel'),
          el('button', { type: 'submit', class: 'btn btn--primary' }, 'Submit')
        )
      )
    ];
  }

  /* ---- Public API ------------------------------------------------------- */

  PCP.render = {
    el,
    bind,
    formatDate,
    renderHeader,
    renderProperties,
    renderRangeLabel,
    renderTickets,
    renderPermits,
    modalStatus,
    modalText,
    modalRequestForm,

    /** Render the full dashboard from one API payload. */
    dashboard(data, range) {
      renderHeader(data);
      renderProperties(data.properties ?? [data.property], data.property.id);
      renderRangeLabel(range);
      renderTickets(data.tickets);
      renderPermits(data.permits);
    }
  };

})(window.PCP = window.PCP || {});
