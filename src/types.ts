export type DroneStatus = "Searching" | "Investigating" | "Returning" | "Idle";

export type Severity = "low" | "medium" | "high" | "critical";

export type POIType =
  | "Debris field"
  | "Downed power line"
  | "Flipped vehicle"
  | "Damaged structure"
  | "Possible survivor"
  | "Still person"
  | "Gas leak"
  | "Blocked road";

export interface Drone {
  id: string;
  name: string;
  battery: number;
  signal: number;
  distanceMiles: number;
  currentTask: string;
  status: DroneStatus;
  coordinates: [number, number];
  path: [number, number][];
}

export interface POI {
  id: string;
  type: POIType;
  coordinates: [number, number];
  severity: Severity;
  timestamp: string;
  notes?: string;
}

export interface MissionEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: Severity;
  droneId?: string;
}

export interface MissionStats {
  areaScannedSqMi: number;
  structuresChecked: number;
  averageBattery: number;
  timeElapsed: string;
  searchPriorityScore: number;
  recommendations: string[];
}
