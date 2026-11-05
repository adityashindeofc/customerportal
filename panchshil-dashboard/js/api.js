/**
 * api.js
 * ---------------------------------------------------------------------------
 * Data access layer. The UI talks ONLY to these functions, so connecting the
 * real backend is a change in this file alone.
 *
 * GET {apiBaseUrl}/dashboard?from=yyyy-mm-dd&to=yyyy-mm-dd&propertyId=…
 *
 *   {
 *     "user":       { "name": "Tech Park One", "initials": "TH" },
 *     "property":   { "id": "tp1", "name": "Tech Park One" },
 *     "properties": [ { "id": "tp1", "name": "Tech Park One" } ],
 *     "aqi":        null | number,
 *     "tickets":    { "closed": 1, "open": 2, "serviceConcerns": 3,
 *                     "requests": 0, "suggestions": 0 },
 *     "permits":    { "total": 0, "approved": 0, "open": 0,
 *                     "rejected": 0, "closed": 0 }
 *   }
 *
 * Exposes: window.PCP.api
 * ---------------------------------------------------------------------------
 */
(function (PCP) {
  'use strict';

  const { config } = PCP;

  /** JSON request with consistent error handling. */
  async function request(path, options = {}) {
    const response = await fetch(config.apiBaseUrl + path, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',                       // send session cookie
      ...options
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    return response.status === 204 ? null : response.json();
  }

  /** Simulated latency for mock mode. */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  PCP.api = {

    /**
     * Dashboard summary for a date range and property.
     * @param {{from: string, to: string, propertyId?: string}} params
     * @returns {Promise<object>}
     */
    async getDashboard(params) {
      if (config.useMockData) {
        await delay(120);
        return JSON.parse(JSON.stringify(config.mock));
      }
      const query = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v != null)
      ).toString();
      return request(`/dashboard?${query}`);
    },

    /**
     * Create a ticket.
     * @param {{type: string, subject: string, description: string}} payload
     */
    async createTicket(payload) {
      if (config.useMockData) { await delay(300); return { id: 'mock-ticket' }; }
      return request('/tickets', { method: 'POST', body: JSON.stringify(payload) });
    },

    /**
     * Create a permit application.
     * @param {{type: string, subject: string, description: string}} payload
     */
    async createPermit(payload) {
      if (config.useMockData) { await delay(300); return { id: 'mock-permit' }; }
      return request('/permits', { method: 'POST', body: JSON.stringify(payload) });
    }
  };

})(window.PCP = window.PCP || {});
