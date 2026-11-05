/**
 * config.js
 * ---------------------------------------------------------------------------
 * Static configuration: status definitions, labels, form options and mock
 * data. Everything that is "content" rather than "behaviour" lives here.
 *
 * Exposes: window.PCP.config
 * ---------------------------------------------------------------------------
 */
(function (PCP) {
  'use strict';

  const config = {

    /** Switch to false once js/api.js is connected to real endpoints. */
    useMockData: true,

    /** Base URL for the portal API (used by api.js). */
    apiBaseUrl: '/api',

    /**
     * Ticket statuses — rendered left → right in this order.
     *  key    : field name in the API response (`tickets.<key>`)
     *  label  : visible label
     *  hint   : small caption under the number
     *  accent : true → terracotta number + dot (use for statuses needing attention)
     */
    ticketStatuses: [
      { key: 'closed',          label: 'Closed',           hint: 'Resolved tickets',    accent: false },
      { key: 'open',            label: 'Open',             hint: 'Awaiting resolution', accent: true  },
      { key: 'serviceConcerns', label: 'Service Concerns', hint: 'Reported concerns',   accent: false },
      { key: 'requests',        label: 'Requests',         hint: 'Service requests',    accent: false },
      { key: 'suggestions',     label: 'Suggestions',      hint: 'Shared feedback',     accent: false }
    ],

    /** Permit statuses — rendered left → right in this order. */
    permitStatuses: [
      { key: 'total',    label: 'Total'    },
      { key: 'approved', label: 'Approved' },
      { key: 'open',     label: 'Open'     },
      { key: 'rejected', label: 'Rejected' },
      { key: 'closed',   label: 'Closed'   }
    ],

    /** "Raise a ticket" form. */
    ticketForm: {
      title:         'Raise a ticket',
      typeLabel:     'Category',
      types:         ['Service concern', 'Request', 'Suggestion'],
      subjectLabel:  'Subject',
      successToast:  'Ticket raised'
    },

    /** "Apply for a permit" form. */
    permitForm: {
      title:         'Apply for a permit',
      typeLabel:     'Permit type',
      types:         ['Work permit', 'Access permit'],
      subjectLabel:  'Work or access details',
      successToast:  'Permit application submitted'
    },

    /** Default date range on first load (ISO yyyy-mm-dd). */
    defaultRange: { from: '2026-10-29', to: '2026-11-05' },

    /** Text shown when AQI is null / unavailable. */
    aqiFallback: 'Not available',

    /** Mock payload — same shape the real API must return (see README §7). */
    mock: {
      user:       { name: 'Tech Park One', initials: 'TH' },
      property:   { id: 'tp1', name: 'Tech Park One' },
      properties: [{ id: 'tp1', name: 'Tech Park One' }],
      aqi:        null,
      tickets:    { closed: 1, open: 2, serviceConcerns: 3, requests: 0, suggestions: 0 },
      permits:    { total: 0, approved: 0, open: 0, rejected: 0, closed: 0 }
    }
  };

  PCP.config = Object.freeze(config);

})(window.PCP = window.PCP || {});
