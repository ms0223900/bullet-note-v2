/**
 * Google Analytics (gtag) configuration constants
 */

export const GTAG_CONFIG = {
  // GA Measurement ID from the provided configuration
  MEASUREMENT_ID: 'G-B8VEK5YKPB',
  // Google Analytics script URL
  SCRIPT_URL: 'https://www.googletagmanager.com/gtag/js',
} as const;

export const GTAG_EVENTS = {
  PAGE_VIEW: 'page_view',
  CUSTOM_EVENT: 'custom_event',
  USER_ENGAGEMENT: 'user_engagement',
} as const;

export type GTagEventName = (typeof GTAG_EVENTS)[keyof typeof GTAG_EVENTS];
