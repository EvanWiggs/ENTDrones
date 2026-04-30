import { useEffect, useMemo, useState } from "react";
import { drones, missionEvents, missionStats, poiTypes, samplePOIs, severities } from "./data/mockData";
import { DashboardLayout } from "./components/DashboardLayout";
import type { POI, POIType, Severity } from "./types";
import { loadStoredPOIs, saveStoredPOIs } from "./lib/storage";

export default function App() {
  const [pois, setPois] = useState<POI[]>(() => loadStoredPOIs());
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<POIType>(poiTypes[0]);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity>(severities[1]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    saveStoredPOIs(pois);
  }, [pois]);

  const selectedPoi = useMemo(() => pois.find((poi) => poi.id === selectedPoiId) ?? null, [pois, selectedPoiId]);

  function addPoi(coordinates: [number, number], customNotes = notes) {
    const poi: POI = {
      id: crypto.randomUUID(),
      type: selectedType,
      severity: selectedSeverity,
      coordinates,
      timestamp: new Date().toISOString(),
      notes: customNotes.trim() || undefined,
    };
    setPois((current) => [poi, ...current]);
    setSelectedPoiId(poi.id);
    setNotes("");
  }

  function deletePoi(id: string) {
    setPois((current) => current.filter((poi) => poi.id !== id));
    setSelectedPoiId((current) => (current === id ? null : current));
  }

  function clearPois() {
    setPois([]);
    setSelectedPoiId(null);
  }

  function loadSamples() {
    setPois(samplePOIs);
    setSelectedPoiId(samplePOIs[0]?.id ?? null);
  }

  function addRandomPoi() {
    const base: [number, number] = [-97.4395, 35.2226];
    const randomLng = base[0] + (Math.random() - 0.5) * 0.05;
    const randomLat = base[1] + (Math.random() - 0.5) * 0.035;
    addPoi([Number(randomLng.toFixed(6)), Number(randomLat.toFixed(6))], notes || "Demo item placed near active search grid.");
  }

  return (
    <DashboardLayout
      drones={drones}
      events={missionEvents}
      missionStats={missionStats}
      pois={pois}
      selectedPoi={selectedPoi}
      selectedType={selectedType}
      selectedSeverity={selectedSeverity}
      notes={notes}
      onTypeChange={setSelectedType}
      onSeverityChange={setSelectedSeverity}
      onNotesChange={setNotes}
      onMapAddPoi={addPoi}
      onSelectPoi={setSelectedPoiId}
      onDeletePoi={deletePoi}
      onClearPois={clearPois}
      onLoadSamples={loadSamples}
      onAddRandomPoi={addRandomPoi}
    />
  );
}
