// Shared rules for what appears on a public page. Used by the server and by the dashboard's status chips.
const EVENT_GRACE_MS = 12 * 60 * 60 * 1000; // an event with no end time stays up 12 hours after it starts

export function effectiveEnd(item) {
  if (item.ends_at) return Date.parse(item.ends_at);
  if (item.kind === 'event' && item.event_date) return Date.parse(item.event_date) + EVENT_GRACE_MS;
  return null;
}

export function itemStatus(item, now = Date.now()) {
  if (!item.active) return 'off';
  if (item.starts_at && Date.parse(item.starts_at) > now) return 'scheduled';
  const end = effectiveEnd(item);
  if (end !== null && end <= now) return 'expired';
  if (item.kind !== 'section' && !item.url && !item.sold_out) return 'no-url';
  return 'live';
}

export const isVisible = (item, now = Date.now()) => itemStatus(item, now) === 'live';

// Pinned items go first. A section heading is dropped when no visible link follows it.
export function visibleItems(items, now = Date.now()) {
  const pinned = [];
  const rest = [];
  let pendingSection = null;
  for (const item of items) {
    if (item.kind === 'section') {
      pendingSection = isVisible(item, now) ? item : null;
      continue;
    }
    if (!isVisible(item, now)) continue;
    if (item.pinned) { pinned.push(item); continue; }
    if (pendingSection) { rest.push(pendingSection); pendingSection = null; }
    rest.push(item);
  }
  return [...pinned, ...rest];
}
