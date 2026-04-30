import { AlertTriangle, RadioTower } from "lucide-react";
import { useMemo, useState } from "react";
import type { Drone, MissionEvent, MissionStats, POI, POIType, Severity } from "../types";
import { DroneCard } from "./DroneCard";
import { IncidentFeed } from "./IncidentFeed";
import { IncidentMap } from "./IncidentMap";
import { MissionStatsPanel } from "./MissionStatsPanel";
import { POIControls } from "./POIControls";
import { POIList } from "./POIList";
import { SwarmSummary } from "./SwarmSummary";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs } from "./ui/tabs";

type Tab = "feed" | "pois" | "stats" | "manual";

interface DashboardLayoutProps {
  drones: Drone[];
  events: MissionEvent[];
  missionStats: MissionStats;
  pois: POI[];
  selectedPoi: POI | null;
  selectedType: POIType;
  selectedSeverity: Severity;
  notes: string;
  onTypeChange: (type: POIType) => void;
  onSeverityChange: (severity: Severity) => void;
  onNotesChange: (notes: string) => void;
  onMapAddPoi: (coordinates: [number, number]) => void;
  onSelectPoi: (id: string | null) => void;
  onDeletePoi: (id: string) => void;
  onClearPois: () => void;
  onLoadSamples: () => void;
  onAddRandomPoi: () => void;
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const [tab, setTab] = useState<Tab>("feed");
  const criticalAlerts = useMemo(() => props.pois.filter((poi) => poi.severity === "critical").length, [props.pois]);

  return (
    <main className="flex h-dvh w-screen gap-3 overflow-hidden p-3">
      <section className="flex min-w-[390px] basis-[43%] flex-col gap-3 overflow-hidden">
        <div className="flex h-[49%] min-h-0 flex-col gap-3">
          <header className="flex items-center justify-between rounded-lg border border-border/70 bg-card/80 px-4 py-3 shadow-panel backdrop-blur">
            <div>
              <div className="flex items-center gap-2">
                <RadioTower className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold">GridSwarm™ Command</h1>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Moore, OK — Rapid damage assessment</p>
            </div>
            <Badge className="border-emerald-400/40 bg-emerald-500/14 text-emerald-100">Active Search</Badge>
          </header>
          <SwarmSummary drones={props.drones} pois={props.pois} criticalAlerts={criticalAlerts} />
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto pr-1">
            {props.drones.map((drone) => (
              <DroneCard drone={drone} key={drone.id} />
            ))}
          </div>
        </div>

        <Card className="flex h-[51%] min-h-0 flex-col p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Tabs
              value={tab}
              onValueChange={setTab}
              tabs={[
                { value: "feed", label: "Incident Feed" },
                { value: "pois", label: "POIs" },
                { value: "stats", label: "Mission Stats" },
                { value: "manual", label: "Manual Add" },
              ]}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            {tab === "feed" && <IncidentFeed events={props.events} pois={props.pois} />}
            {tab === "pois" && (
              <POIList
                pois={props.pois}
                selectedPoiId={props.selectedPoi?.id ?? null}
                onSelectPoi={props.onSelectPoi}
                onDeletePoi={props.onDeletePoi}
                onClearPois={props.onClearPois}
                onLoadSamples={props.onLoadSamples}
              />
            )}
            {tab === "stats" && <MissionStatsPanel stats={props.missionStats} />}
            {tab === "manual" && (
              <POIControls
                selectedType={props.selectedType}
                selectedSeverity={props.selectedSeverity}
                notes={props.notes}
                onTypeChange={props.onTypeChange}
                onSeverityChange={props.onSeverityChange}
                onNotesChange={props.onNotesChange}
                onAddRandomPoi={props.onAddRandomPoi}
              />
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5 text-yellow-300" />
            Prototype simulation — not for operational use.
          </div>
        </Card>
      </section>

      <section className="min-w-0 flex-1 overflow-hidden rounded-lg border border-border/80 bg-card/70 shadow-panel">
        <IncidentMap
          drones={props.drones}
          pois={props.pois}
          selectedPoi={props.selectedPoi}
          selectedType={props.selectedType}
          selectedSeverity={props.selectedSeverity}
          notes={props.notes}
          onAddPoi={props.onMapAddPoi}
          onSelectPoi={props.onSelectPoi}
          onDeletePoi={props.onDeletePoi}
          onTypeChange={props.onTypeChange}
          onSeverityChange={props.onSeverityChange}
          onNotesChange={props.onNotesChange}
          onLoadSamples={props.onLoadSamples}
          onClearPois={props.onClearPois}
        />
      </section>
    </main>
  );
}
