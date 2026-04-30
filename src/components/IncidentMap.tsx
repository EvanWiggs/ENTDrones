import { useEffect, useMemo, useRef, useState } from "react";
import { Layers, LocateFixed, MapPinPlus, Trash2 } from "lucide-react";
import { NORMAN_CENTER, poiTypes, searchArea, severities } from "../data/mockData";
import { formatCoordinates, formatTimestamp, severityClasses, severityDot } from "../lib/format";
import type { Drone, POI, POIType, Severity } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, Textarea } from "./ui/form";

interface IncidentMapProps {
  drones: Drone[];
  pois: POI[];
  selectedPoi: POI | null;
  selectedType: POIType;
  selectedSeverity: Severity;
  notes: string;
  onAddPoi: (coordinates: [number, number]) => void;
  onSelectPoi: (id: string | null) => void;
  onDeletePoi: (id: string) => void;
  onTypeChange: (type: POIType) => void;
  onSeverityChange: (severity: Severity) => void;
  onNotesChange: (notes: string) => void;
  onLoadSamples: () => void;
  onClearPois: () => void;
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

const disasterMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#182333" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#c8d3df" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#101827" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#3a4758" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#162233" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#293548" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#121a27" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9fb0c5" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d2838" }] },
];

let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMaps() {
  if (window.google?.maps) return Promise.resolve();
  if (!googleMapsApiKey) return Promise.reject(new Error("Missing VITE_GOOGLE_MAPS_API_KEY"));
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-google-maps]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.dataset.googleMaps = "true";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsApiKey)}&v=weekly`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

function toLatLng([lng, lat]: [number, number]): google.maps.LatLngLiteral {
  return { lat, lng };
}

export function IncidentMap({
  drones,
  pois,
  selectedPoi,
  selectedType,
  selectedSeverity,
  notes,
  onAddPoi,
  onSelectPoi,
  onDeletePoi,
  onTypeChange,
  onSeverityChange,
  onNotesChange,
  onLoadSamples,
  onClearPois,
}: IncidentMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const pathsRef = useRef<google.maps.Polyline[]>([]);
  const searchPolygonRef = useRef<google.maps.Polygon | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const addPoiRef = useRef(onAddPoi);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "missing-key" | "error">("loading");

  useEffect(() => {
    addPoiRef.current = onAddPoi;
  }, [onAddPoi]);

  const droneBounds = useMemo(() => {
    if (!pois.length && !drones.length) return null;
    return [...drones.map((drone) => drone.coordinates), ...pois.map((poi) => poi.coordinates)];
  }, [drones, pois]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    loadGoogleMaps()
      .then(() => {
        if (!containerRef.current || mapRef.current) return;
        const map = new google.maps.Map(containerRef.current, {
          center: toLatLng(NORMAN_CENTER),
          zoom: 13,
          tilt: 45,
          heading: 338,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          backgroundColor: "#0f172a",
          styles: disasterMapStyles,
        });

        mapRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow({ disableAutoPan: false });

        searchPolygonRef.current = new google.maps.Polygon({
          paths: searchArea.map(toLatLng),
          strokeColor: "#67e8f9",
          strokeOpacity: 0.9,
          strokeWeight: 2,
          fillColor: "#06b6d4",
          fillOpacity: 0.18,
          clickable: false,
          map,
        });

        map.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (!event.latLng) return;
          addPoiRef.current([Number(event.latLng.lng().toFixed(6)), Number(event.latLng.lat().toFixed(6))]);
        });

        setMapStatus("ready");
      })
      .catch((error) => {
        setMapStatus(error instanceof Error && error.message.includes("VITE_GOOGLE_MAPS_API_KEY") ? "missing-key" : "error");
      });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapStatus !== "ready") return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    pathsRef.current.forEach((path) => path.setMap(null));
    pathsRef.current = [];

    drones.forEach((drone) => {
      pathsRef.current.push(
        new google.maps.Polyline({
          path: drone.path.map(toLatLng),
          geodesic: true,
          strokeColor: "#e2e8f0",
          strokeOpacity: 0.78,
          strokeWeight: 3,
          map,
        }),
      );

      const marker = new google.maps.Marker({
        position: toLatLng(drone.coordinates),
        map,
        label: { text: drone.name, color: "#e0f2fe", fontSize: "12px", fontWeight: "700" },
        title: drone.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#22d3ee",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
        },
      });
      markersRef.current.push(marker);
    });

    pois.forEach((poi) => {
      const marker = new google.maps.Marker({
        position: toLatLng(poi.coordinates),
        map,
        title: `${poi.type} (${poi.severity})`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: severityDot[poi.severity],
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: selectedPoi?.id === poi.id ? 11 : 9,
        },
        zIndex: selectedPoi?.id === poi.id ? 20 : 10,
      });
      marker.addListener("click", () => onSelectPoi(poi.id));
      markersRef.current.push(marker);
    });
  }, [drones, mapStatus, onSelectPoi, pois, selectedPoi?.id]);

  useEffect(() => {
    const map = mapRef.current;
    const infoWindow = infoWindowRef.current;
    if (!map || !infoWindow || !selectedPoi) return;

    const position = toLatLng(selectedPoi.coordinates);
    map.panTo(position);
    if ((map.getZoom() ?? 0) < 14) map.setZoom(14);
    infoWindow.setContent(
      `<div style="padding:10px;min-width:220px">
        <div style="font-size:13px;font-weight:700;margin-bottom:6px;color:#f8fafc">${selectedPoi.type}</div>
        <div style="font-size:12px;color:#cbd5e1">Severity: ${selectedPoi.severity}</div>
        <div style="font-size:12px;color:#cbd5e1">Time: ${formatTimestamp(selectedPoi.timestamp)}</div>
        <div style="font-size:12px;color:#cbd5e1">Coords: ${formatCoordinates(selectedPoi.coordinates)}</div>
        ${selectedPoi.notes ? `<div style="font-size:12px;color:#e2e8f0;margin-top:8px">${selectedPoi.notes}</div>` : ""}
      </div>`,
    );
    infoWindow.setPosition(position);
    infoWindow.open({ map });
  }, [selectedPoi]);

  function fitIncidentArea() {
    const map = mapRef.current;
    if (!map || !window.google?.maps) return;
    const bounds = new google.maps.LatLngBounds();
    searchArea.forEach((coordinate) => bounds.extend(toLatLng(coordinate)));
    droneBounds?.forEach((coordinate) => bounds.extend(toLatLng(coordinate)));
    map.fitBounds(bounds, 70);
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={containerRef} className="h-full w-full bg-slate-950" />
      {mapStatus !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/92 p-8 text-center">
          <div className="max-w-md rounded-lg border border-border bg-card/90 p-5 shadow-panel">
            <h2 className="text-base font-semibold">Google Maps setup required</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Add your API key as <code className="rounded bg-muted px-1.5 py-0.5">VITE_GOOGLE_MAPS_API_KEY</code> and restart Vite.
            </p>
            {mapStatus === "error" && <p className="mt-2 text-xs text-red-200">The Google Maps script could not load.</p>}
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <div className="pointer-events-auto rounded-lg border border-border/80 bg-card/88 p-3 shadow-panel backdrop-blur">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Layers className="h-4 w-4 text-primary" />
            Norman disaster area
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedType} onChange={(event) => onTypeChange(event.target.value as POIType)}>
              {poiTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
            <Select value={selectedSeverity} onChange={(event) => onSeverityChange(event.target.value as Severity)}>
              {severities.map((severity) => (
                <option key={severity}>{severity}</option>
              ))}
            </Select>
          </div>
          <Textarea
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            className="mt-2 h-16 min-h-16 w-[360px]"
            placeholder="Optional POI notes"
          />
          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={onLoadSamples}>Load samples</Button>
            <Button size="sm" variant="outline" onClick={onClearPois} disabled={!pois.length}>Clear POIs</Button>
            <Button size="icon" variant="ghost" onClick={fitIncidentArea} aria-label="Fit incident area">
              <LocateFixed className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
            <MapPinPlus className="h-3.5 w-3.5 text-primary" />
            Click anywhere on the map to place the selected item.
          </div>
        </div>

        {selectedPoi && (
          <div className="pointer-events-auto w-[320px] rounded-lg border border-border/80 bg-card/90 p-3 shadow-panel backdrop-blur">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">{selectedPoi.type}</h2>
                <p className="text-xs text-muted-foreground">{formatTimestamp(selectedPoi.timestamp)}</p>
              </div>
              <Badge className={severityClasses[selectedPoi.severity]}>{selectedPoi.severity}</Badge>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>{formatCoordinates(selectedPoi.coordinates)}</p>
              <p className="leading-5 text-slate-200">{selectedPoi.notes ?? "No operator notes provided."}</p>
            </div>
            <Button className="mt-3 w-full" size="sm" variant="destructive" onClick={() => onDeletePoi(selectedPoi.id)}>
              <Trash2 className="h-4 w-4" />
              Delete POI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
