import { Focus, Trash2 } from "lucide-react";
import type { POI } from "../types";
import { formatTimestamp, severityClasses } from "../lib/format";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface POIListProps {
  pois: POI[];
  selectedPoiId: string | null;
  onSelectPoi: (id: string) => void;
  onDeletePoi: (id: string) => void;
  onClearPois: () => void;
  onLoadSamples: () => void;
}

export function POIList({ pois, selectedPoiId, onSelectPoi, onDeletePoi, onClearPois, onLoadSamples }: POIListProps) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={onLoadSamples}>Load sample incident</Button>
        <Button size="sm" variant="outline" onClick={onClearPois} disabled={!pois.length}>Clear all</Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {pois.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
            No POIs yet. Place one from the map or Manual Add.
          </div>
        ) : (
          <div className="space-y-2">
            {pois.map((poi) => (
              <button
                type="button"
                key={poi.id}
                onClick={() => onSelectPoi(poi.id)}
                className={`w-full rounded-md border p-3 text-left transition-colors ${
                  selectedPoiId === poi.id ? "border-primary bg-primary/10" : "border-border/70 bg-background/36 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Focus className="h-4 w-4 text-primary" />
                      <span className="truncate text-sm font-medium">{poi.type}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{formatTimestamp(poi.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={severityClasses[poi.severity]}>{poi.severity}</Badge>
                    <Button
                      aria-label={`Delete ${poi.type}`}
                      size="icon"
                      variant="ghost"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeletePoi(poi.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
