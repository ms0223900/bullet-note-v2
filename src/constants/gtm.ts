/**
 * Google Tag Manager configuration constants
 */

export const GTM_CONFIG = {
  // GTM ID from the provided configuration
  ID: 'GTM-N4RHJL7L',
  // GTM script URL
  SCRIPT_URL: 'https://www.googletagmanager.com/gtm.js',
} as const;

export const GTM_EVENTS = {
  PAGE_VIEW: 'page_view',
  NOTE_CREATED: 'note_created',
  NOTE_UPDATED: 'note_updated',
  NOTE_DELETED: 'note_deleted',
  THEME_CHANGED: 'theme_changed',
  VIEW_MODE_CHANGED: 'view_mode_changed',
} as const;

export type GTMEventName = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];
