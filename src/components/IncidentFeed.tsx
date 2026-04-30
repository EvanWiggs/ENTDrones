import { AlertCircle } from "lucide-react";
import type { MissionEvent, POI } from "../types";
import { formatTimestamp, severityClasses } from "../lib/format";
import { Badge } from "./ui/badge";

export function IncidentFeed({ events, pois }: { events: MissionEvent[]; pois: POI[] }) {
  const poiEvents: MissionEvent[] = pois.slice(0, 4).map((poi) => ({
    id: `poi-event-${poi.id}`,
    timestamp: formatTimestamp(poi.timestamp),
    title: `${poi.type} marked ${poi.severity}`,
    description: poi.notes ?? "Manual map item added by command operator.",
    severity: poi.severity,
  }));
  const merged = [...poiEvents, ...events];

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="space-y-2">
        {merged.map((event) => (
          <div className="rounded-md border border-border/70 bg-background/36 p-3" key={event.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
                  <p className="truncate text-sm font-medium">{event.title}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{event.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[11px] text-muted-foreground">{event.timestamp}</span>
                <Badge className={severityClasses[event.severity]}>{event.severity}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
