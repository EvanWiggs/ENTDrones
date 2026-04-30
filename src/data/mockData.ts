import type { Drone, MissionEvent, MissionStats, POI, POIType, Severity } from "../types";

export const NORMAN_CENTER: [number, number] = [-97.4395, 35.2226];

export const poiTypes: POIType[] = [
  "Debris field",
  "Downed power line",
  "Flipped vehicle",
  "Damaged structure",
  "Possible survivor",
  "Still person",
  "Gas leak",
  "Blocked road",
];

export const severities: Severity[] = ["low", "medium", "high", "critical"];

export const drones: Drone[] = [
  {
    id: "drone-1",
    name: "Drone 1",
    battery: 82,
    signal: 94,
    distanceMiles: 0.7,
    currentTask: "Grid sweep over commercial corridor",
    status: "Searching",
    coordinates: [-97.4502, 35.2291],
    path: [
      [-97.465, 35.223],
      [-97.459, 35.226],
      [-97.4502, 35.2291],
    ],
  },
  {
    id: "drone-2",
    name: "Drone 2",
    battery: 67,
    signal: 88,
    distanceMiles: 1.1,
    currentTask: "Investigating heat signature",
    status: "Investigating",
    coordinates: [-97.4301, 35.2346],
    path: [
      [-97.442, 35.226],
      [-97.437, 35.231],
      [-97.4301, 35.2346],
    ],
  },
  {
    id: "drone-3",
    name: "Drone 3",
    battery: 31,
    signal: 73,
    distanceMiles: 1.6,
    currentTask: "Return route assessment",
    status: "Returning",
    coordinates: [-97.4214, 35.2147],
    path: [
      [-97.436, 35.212],
      [-97.429, 35.2135],
      [-97.4214, 35.2147],
    ],
  },
  {
    id: "drone-4",
    name: "Drone 4",
    battery: 91,
    signal: 96,
    distanceMiles: 0.4,
    currentTask: "Standby for close inspection",
    status: "Idle",
    coordinates: [-97.4464, 35.2173],
    path: [
      [-97.452, 35.215],
      [-97.449, 35.216],
      [-97.4464, 35.2173],
    ],
  },
];

export const searchArea: [number, number][] = [
  [-97.4679, 35.2402],
  [-97.4262, 35.2447],
  [-97.4064, 35.2175],
  [-97.4517, 35.1998],
  [-97.4787, 35.2158],
  [-97.4679, 35.2402],
];

export const missionEvents: MissionEvent[] = [
  {
    id: "event-1",
    timestamp: "14:06",
    title: "Drone 2 detected possible survivor",
    description: "Thermal contrast detected near collapsed frontage road structure.",
    severity: "critical",
    droneId: "drone-2",
  },
  {
    id: "event-2",
    timestamp: "14:02",
    title: "Drone 1 mapped debris field",
    description: "Wide debris pattern blocking access from the west approach.",
    severity: "high",
    droneId: "drone-1",
  },
  {
    id: "event-3",
    timestamp: "13:58",
    title: "Drone 3 battery low",
    description: "Autonomous return path prepared; replacement unit recommended.",
    severity: "medium",
    droneId: "drone-3",
  },
  {
    id: "event-4",
    timestamp: "13:51",
    title: "Downed power line marked critical",
    description: "Hazard boundary suggested for utility response team.",
    severity: "critical",
  },
  {
    id: "event-5",
    timestamp: "13:45",
    title: "Primary search polygon established",
    description: "Command defined a 1.8 square mile assessment area.",
    severity: "low",
  },
];

export const missionStats: MissionStats = {
  areaScannedSqMi: 1.34,
  structuresChecked: 47,
  averageBattery: 68,
  timeElapsed: "00:42:18",
  searchPriorityScore: 87,
  recommendations: [
    "Dispatch ground team to thermal signature east of Main Street.",
    "Hold traffic westbound until blocked-road POIs are verified.",
    "Rotate Drone 3 after return; maintain two-aircraft search minimum.",
  ],
};

export const samplePOIs: POI[] = [
  {
    id: "sample-1",
    type: "Possible survivor",
    severity: "critical",
    coordinates: [-97.4312, 35.2352],
    timestamp: "2026-04-30T19:05:00.000Z",
    notes: "Intermittent thermal signature beside partially collapsed building.",
  },
  {
    id: "sample-2",
    type: "Downed power line",
    severity: "critical",
    coordinates: [-97.4527, 35.2241],
    timestamp: "2026-04-30T19:01:00.000Z",
    notes: "Line appears active; keep responders outside marked perimeter.",
  },
  {
    id: "sample-3",
    type: "Blocked road",
    severity: "high",
    coordinates: [-97.4444, 35.2168],
    timestamp: "2026-04-30T18:58:00.000Z",
    notes: "Large limb and roofing material across two lanes.",
  },
  {
    id: "sample-4",
    type: "Damaged structure",
    severity: "high",
    coordinates: [-97.4199, 35.2206],
    timestamp: "2026-04-30T18:49:00.000Z",
    notes: "Roof breach visible; recommend structural triage before entry.",
  },
  {
    id: "sample-5",
    type: "Gas leak",
    severity: "critical",
    coordinates: [-97.4603, 35.2325],
    timestamp: "2026-04-30T18:44:00.000Z",
    notes: "Responder report cross-checked with aerial plume indicator.",
  },
];
