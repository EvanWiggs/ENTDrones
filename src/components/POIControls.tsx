import { MapPinPlus } from "lucide-react";
import { poiTypes, severities } from "../data/mockData";
import type { POIType, Severity } from "../types";
import { Button } from "./ui/button";
import { Select, Textarea } from "./ui/form";

interface POIControlsProps {
  selectedType: POIType;
  selectedSeverity: Severity;
  notes: string;
  onTypeChange: (type: POIType) => void;
  onSeverityChange: (severity: Severity) => void;
  onNotesChange: (notes: string) => void;
  onAddRandomPoi: () => void;
}

export function POIControls({
  selectedType,
  selectedSeverity,
  notes,
  onTypeChange,
  onSeverityChange,
  onNotesChange,
  onAddRandomPoi,
}: POIControlsProps) {
  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1.5 text-xs text-muted-foreground">
          POI type
          <Select value={selectedType} onChange={(event) => onTypeChange(event.target.value as POIType)} className="w-full">
            {poiTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </label>
        <label className="space-y-1.5 text-xs text-muted-foreground">
          Severity
          <Select
            value={selectedSeverity}
            onChange={(event) => onSeverityChange(event.target.value as Severity)}
            className="w-full capitalize"
          >
            {severities.map((severity) => (
              <option key={severity}>{severity}</option>
            ))}
          </Select>
        </label>
      </div>
      <label className="mt-3 block space-y-1.5 text-xs text-muted-foreground">
        Notes
        <Textarea
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Responder note, hazard context, or verification status"
        />
      </label>
      <div className="mt-3 rounded-md border border-primary/25 bg-primary/10 p-3">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <MapPinPlus className="h-4 w-4" />
          Click map to place selected item
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          The selected type, severity, and notes are saved locally on this device for demo persistence.
        </p>
      </div>
      <Button className="mt-3 w-full" variant="secondary" onClick={onAddRandomPoi}>
        <MapPinPlus className="h-4 w-4" />
        Add random nearby POI
      </Button>
    </div>
  );
}
