import { Battery, Radio, Route } from "lucide-react";
import type { Drone, DroneStatus } from "../types";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

const statusStyles: Record<DroneStatus, string> = {
  Searching: "border-cyan-400/40 bg-cyan-500/12 text-cyan-100",
  Investigating: "border-orange-400/45 bg-orange-500/15 text-orange-100",
  Returning: "border-yellow-400/45 bg-yellow-500/15 text-yellow-100",
  Idle: "border-slate-400/35 bg-slate-500/15 text-slate-100",
};

export function DroneCard({ drone }: { drone: Drone }) {
  return (
    <Card className="min-h-[176px] p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">{drone.name}</h2>
          <p className="line-clamp-1 text-[11px] text-muted-foreground">{drone.currentTask}</p>
        </div>
        <Badge className={statusStyles[drone.status]}>{drone.status}</Badge>
      </div>
      <div className="camera-feed mb-3 h-20 rounded-md border border-border/70">
        <div className="absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-cyan-100">LIVE MOCK</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-white/70">{drone.coordinates[1].toFixed(3)} N</div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
        <div>
          <div className="mb-1 flex items-center gap-1">
            <Battery className="h-3.5 w-3.5" /> {drone.battery}%
          </div>
          <Progress value={drone.battery} indicatorClassName={drone.battery < 35 ? "bg-yellow-300" : "bg-emerald-300"} />
        </div>
        <div>
          <div className="mb-1 flex items-center gap-1">
            <Radio className="h-3.5 w-3.5" /> {drone.signal}%
          </div>
          <Progress value={drone.signal} indicatorClassName="bg-cyan-300" />
        </div>
        <div className="rounded-md bg-muted/40 p-1.5">
          <div className="flex items-center gap-1">
            <Route className="h-3.5 w-3.5 text-primary" />
            <span>{drone.distanceMiles.toFixed(1)} mi</span>
          </div>
          <div className="mt-1 text-[10px]">from command</div>
        </div>
      </div>
    </Card>
  );
}
