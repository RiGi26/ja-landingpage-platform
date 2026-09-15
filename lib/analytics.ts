import { track } from '@vercel/analytics'

export const ANALYTICS_EVENTS = {
  publicCtaStoreClick: 'public_cta_store_click',
} as const

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]

export type AnalyticsEventProperties = {
  [ANALYTICS_EVENTS.publicCtaStoreClick]: {
    source_page: string
    destination: string
  }
}

const ALLOWED_PROPERTIES: Record<AnalyticsEventName, readonly string[]> = {
  [ANALYTICS_EVENTS.publicCtaStoreClick]: ['source_page', 'destination'],
}

const MAX_PROPERTY_LENGTH = 255

function sanitizeProperties<TEvent extends AnalyticsEventName>(
  eventName: TEvent,
  properties: AnalyticsEventProperties[TEvent],
): Record<string, string | number | boolean | null> {
  const allowed = ALLOWED_PROPERTIES[eventName]
  const safeProperties: Record<string, string | number | boolean | null> = {}

  for (const [key, value] of Object.entries(properties)) {
    if (!allowed.includes(key)) continue
    if (typeof value === 'string') {
      safeProperties[key] = value.trim().slice(0, MAX_PROPERTY_LENGTH)
    } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      safeProperties[key] = value
    }
  }

  return safeProperties
}

/** Fire-and-forget, browser-only analytics. Provider failures never affect navigation. */
export function trackEvent<TEvent extends AnalyticsEventName>(
  eventName: TEvent,
  properties: AnalyticsEventProperties[TEvent],
): void {
  if (typeof window === 'undefined') return

  try {
    track(eventName, sanitizeProperties(eventName, properties))
  } catch {
    // Analytics must remain non-critical to the Public experience.
  }
}
