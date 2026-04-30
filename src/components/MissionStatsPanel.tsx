import { Building2, Clock3, Gauge, MapPinned, ShieldAlert } from "lucide-react";
import type { MissionStats } from "../types";
import { Progress } from "./ui/progress";

export function MissionStatsPanel({ stats }: { stats: MissionStats }) {
  const items = [
    { label: "Area scanned", value: `${stats.areaScannedSqMi.toFixed(2)} sq mi`, icon: MapPinned },
    { label: "Structures checked", value: stats.structuresChecked.toString(), icon: Building2 },
    { label: "Average battery", value: `${stats.averageBattery}%`, icon: Gauge },
    { label: "Time elapsed", value: stats.timeElapsed, icon: Clock3 },
  ];

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className="rounded-md border border-border/70 bg-background/36 p-3" key={item.label}>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
              <div className="mt-2 text-lg font-semibold">{item.value}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-md border border-border/70 bg-background/36 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShieldAlert className="h-4 w-4 text-orange-200" />
            Search priority score
          </div>
          <span className="text-lg font-semibold">{stats.searchPriorityScore}</span>
        </div>
        <Progress value={stats.searchPriorityScore} indicatorClassName="bg-orange-300" />
      </div>
      <div className="mt-3 rounded-md border border-border/70 bg-background/36 p-3">
        <h3 className="text-sm font-semibold">Response recommendations</h3>
        <div className="mt-2 space-y-2">
          {stats.recommendations.map((recommendation) => (
            <p className="rounded-md bg-muted/45 p-2 text-xs leading-5 text-muted-foreground" key={recommendation}>
              {recommendation}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
