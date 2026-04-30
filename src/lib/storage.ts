import type { POI } from "../types";

const POI_STORAGE_KEY = "aerorescue-pois";

export function loadStoredPOIs(): POI[] {
  try {
    const raw = localStorage.getItem(POI_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredPOIs(pois: POI[]) {
  localStorage.setItem(POI_STORAGE_KEY, JSON.stringify(pois));
}
