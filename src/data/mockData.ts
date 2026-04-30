import type { Drone, MissionEvent, MissionStats, POI, POIType, Severity } from "../types";

export const MOORE_CENTER: [number, number] = [-97.5124027678208, 35.32669309303190];

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
    battery: 86,
    signal: 95,
    distanceMiles: 0.2,
    currentTask: "Scanning north grid",
    status: "Searching",
    coordinates: [-97.5148, 35.3302],
    path: [
      [-97.5164, 35.3294],
      [-97.5156, 35.3299],
      [-97.5148, 35.3302],
    ],
  },
  {
    id: "drone-2",
    name: "Drone 2",
    battery: 64,
    signal: 90,
    distanceMiles: 0.4,
    currentTask: "Lighting area for ground team",
    status: "Investigating",
    coordinates: [-97.5106, 35.3314],
    path: [
      [-97.5125, 35.3308],
      [-97.5114, 35.3311],
      [-97.5106, 35.3314],
    ],
  },
  {
    id: "drone-3",
    name: "Drone 3",
    battery: 28,
    signal: 78,
    distanceMiles: 0.7,
    currentTask: "Returning for charge",
    status: "Returning",
    coordinates: [-97.5201, 35.3251],
    path: [
      [-97.5187, 35.3234],
      [-97.5194, 35.3243],
      [-97.5201, 35.3251],
    ],
  },
  {
    id: "drone-4",
    name: "Drone 4",
    battery: 93,
    signal: 97,
    distanceMiles: 0.1,
    currentTask: "Replacing outgoing unit",
    status: "Idle",
    coordinates: [-97.5185, 35.3279],
    path: [
      [-97.5202, 35.3265],
      [-97.5192, 35.3272],
      [-97.5185, 35.3279],
    ],
  },
  {
    id: "drone-5",
    name: "Drone 5",
    battery: 74,
    signal: 92,
    distanceMiles: 0.3,
    currentTask: "Scanning east edge",
    status: "Searching",
    coordinates: [-97.5067, 35.3296],
    path: [
      [-97.5084, 35.3291],
      [-97.5075, 35.3294],
      [-97.5067, 35.3296],
    ],
  },
  {
    id: "drone-6",
    name: "Drone 6",
    battery: 58,
    signal: 86,
    distanceMiles: 0.5,
    currentTask: "Scanning debris corridor",
    status: "Searching",
    coordinates: [-97.5169, 35.3227],
    path: [
      [-97.5191, 35.3218],
      [-97.5180, 35.3223],
      [-97.5169, 35.3227],
    ],
  },
  {
    id: "drone-7",
    name: "Drone 7",
    battery: 41,
    signal: 83,
    distanceMiles: 0.6,
    currentTask: "Returning for battery swap",
    status: "Returning",
    coordinates: [-97.5121, 35.3212],
    path: [
      [-97.5099, 35.3206],
      [-97.5110, 35.3209],
      [-97.5121, 35.3212],
    ],
  },
  {
    id: "drone-8",
    name: "Drone 8",
    battery: 88,
    signal: 94,
    distanceMiles: 0.2,
    currentTask: "Replacing outgoing search lane",
    status: "Investigating",
    coordinates: [-97.5079, 35.3259],
    path: [
      [-97.5058, 35.3250],
      [-97.5068, 35.3255],
      [-97.5079, 35.3259],
    ],
  },
];

export const searchArea: [number, number][] = [
  [-97.51721050490656, 35.33189975724454],
  [-97.52184805660877, 35.32575585785781],
  [-97.52001856373542, 35.320097503604444],
  [-97.511934758016, 35.319889213069466],
  [-97.50440405479318, 35.32485332482821],
  [-97.50317021076232, 35.328775798961324],
  [-97.50721211362203, 35.3334964004086],
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
