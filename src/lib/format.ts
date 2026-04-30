import type { POI, Severity } from "../types";

export const severityClasses: Record<Severity, string> = {
  low: "border-sky-400/40 bg-sky-500/12 text-sky-200",
  medium: "border-yellow-400/45 bg-yellow-500/15 text-yellow-100",
  high: "border-orange-400/45 bg-orange-500/16 text-orange-100",
  critical: "border-red-400/55 bg-red-500/18 text-red-100",
};

export const severityDot: Record<Severity, string> = {
  low: "#7dd3fc",
  medium: "#facc15",
  high: "#fb923c",
  critical: "#ef4444",
};

export function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatCoordinates([lng, lat]: POI["coordinates"]) {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}
