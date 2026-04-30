import { Activity, AlertOctagon, BatteryCharging, Crosshair } from "lucide-react";
import type { Drone, POI } from "../types";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface SwarmSummaryProps {
  drones: Drone[];
  pois: POI[];
  criticalAlerts: number;
}

export function SwarmSummary({ drones, pois, criticalAlerts }: SwarmSummaryProps) {
  const coverage = Math.min(96, 61 + pois.length * 4);

  const metrics = [
    { label: "Area Coverage", value: `${coverage}%`, icon: Crosshair, tone: "text-cyan-200" },
    { label: "Active Drones", value: drones.filter((drone) => drone.status !== "Idle").length.toString(), icon: Activity, tone: "text-emerald-200" },
    { label: "POIs Found", value: pois.length.toString(), icon: BatteryCharging, tone: "text-sky-200" },
    { label: "Critical Alerts", value: criticalAlerts.toString(), icon: AlertOctagon, tone: "text-red-200" },
  ];

  return (
    <Card className="p-3">
      <div className="grid grid-cols-4 gap-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div className="rounded-md border border-border/70 bg-background/42 p-2" key={metric.label}>
              <div className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Icon className={`h-3.5 w-3.5 ${metric.tone}`} />
                <span>{metric.label}</span>
              </div>
              <div className="text-lg font-semibold">{metric.value}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
          <span>Search grid progress</span>
          <span>{coverage}%</span>
        </div>
        <Progress value={coverage} indicatorClassName="bg-cyan-300" />
      </div>
    </Card>
  );
}
