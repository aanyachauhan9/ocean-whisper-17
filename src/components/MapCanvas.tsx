import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Layers, Square, Circle } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapboxToken } from "./MapboxTokenProvider";

interface MapCanvasProps {
  onFloatClick: (floatData: any) => void;
}

const MapCanvas = ({ onFloatClick }: MapCanvasProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [aoiMode, setAoiMode] = useState<'none' | 'rectangle' | 'circle'>('none');
  const { token } = useMapboxToken();

  useEffect(() => {
    if (!mapContainer.current || map.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [65, 20], // Arabian Sea
      zoom: 4,
      pitch: 0,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      addArgoFloats();
      addRegionBoundaries();
    });

    return () => {
      map.current?.remove();
    };
  }, [token]);

  const addArgoFloats = () => {
    if (!map.current) return;

    // Generate sample ARGO float data
    const floats = Array.from({ length: 200 }, (_, i) => ({
      type: 'Feature' as const,
      properties: {
        id: `argo_${i}`,
        platform_id: `${2900000 + i}`,
        cycle_number: Math.floor(Math.random() * 100) + 1,
        profile_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        qc_flag: Math.random() > 0.1 ? 1 : 4, // 1 = good, 4 = bad
        temperature: (Math.random() * 30 + 5).toFixed(1),
        salinity: (Math.random() * 5 + 33).toFixed(2),
        depth: Math.floor(Math.random() * 2000) + 100,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [
          50 + Math.random() * 30, // Longitude
          5 + Math.random() * 30,   // Latitude
        ],
      },
    }));

    map.current.addSource('argo-floats', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: floats,
      },
    });

    // Good quality floats
    map.current.addLayer({
      id: 'argo-floats-good',
      type: 'circle',
      source: 'argo-floats',
      filter: ['==', ['get', 'qc_flag'], 1],
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          3, 4,
          10, 8
        ],
        'circle-color': '#00d4ff',
        'circle-opacity': 0.8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    });

    // Poor quality floats
    map.current.addLayer({
      id: 'argo-floats-poor',
      type: 'circle',
      source: 'argo-floats',
      filter: ['==', ['get', 'qc_flag'], 4],
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          3, 3,
          10, 6
        ],
        'circle-color': '#ff6b6b',
        'circle-opacity': 0.6,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ffffff',
      },
    });

    // Click handler for floats
    map.current.on('click', ['argo-floats-good', 'argo-floats-poor'], (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        onFloatClick(feature.properties);
      }
    });

    // Cursor pointer on hover
    map.current.on('mouseenter', ['argo-floats-good', 'argo-floats-poor'], () => {
      if (map.current) map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', ['argo-floats-good', 'argo-floats-poor'], () => {
      if (map.current) map.current.getCanvas().style.cursor = '';
    });
  };

  const addRegionBoundaries = () => {
    if (!map.current) return;

    // Arabian Sea boundary (simplified)
    const arabianSeaBoundary = {
      type: 'Feature' as const,
      properties: { name: 'Arabian Sea' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [50, 5], [80, 5], [80, 30], [50, 30], [50, 5]
        ]],
      },
    };

    map.current.addSource('regions', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [arabianSeaBoundary],
      },
    });

    map.current.addLayer({
      id: 'regions-fill',
      type: 'fill',
      source: 'regions',
      paint: {
        'fill-color': '#00d4ff',
        'fill-opacity': 0.1,
      },
    });

    map.current.addLayer({
      id: 'regions-outline',
      type: 'line',
      source: 'regions',
      paint: {
        'line-color': '#00d4ff',
        'line-width': 2,
        'line-dasharray': [2, 2],
      },
    });
  };

  const zoomToRegion = (region: string) => {
    if (!map.current) return;
    
    setSelectedRegion(region);
    
    const regions = {
      'arabian-sea': { center: [65, 17.5], zoom: 5 },
      'bay-of-bengal': { center: [88, 15], zoom: 5 },
      'indian-ocean': { center: [75, 0], zoom: 3 },
      'global': { center: [0, 0], zoom: 1 },
    };

    const regionData = regions[region as keyof typeof regions];
    if (regionData) {
      map.current.flyTo({
        center: regionData.center as [number, number],
        zoom: regionData.zoom,
        duration: 2000,
      });
    }
  };

  const startAOI = (mode: 'rectangle' | 'circle') => {
    setAoiMode(mode);
    // In a real implementation, you'd add drawing controls here
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
        {/* Region Selection */}
        <Card className="p-3 bg-card/95 backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Ocean Regions</h3>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'arabian-sea', label: 'Arabian Sea' },
                { id: 'bay-of-bengal', label: 'Bay of Bengal' },
                { id: 'indian-ocean', label: 'Indian Ocean' },
                { id: 'global', label: 'Global' },
              ].map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => zoomToRegion(region.id)}
                  className="text-xs"
                >
                  {region.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* AOI Tools */}
        <Card className="p-3 bg-card/95 backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Area Selection</h3>
            <div className="flex gap-1">
              <Button
                variant={aoiMode === 'rectangle' ? "default" : "outline"}
                size="sm"
                onClick={() => startAOI('rectangle')}
              >
                <Square className="h-3 w-3 mr-1" />
                Box
              </Button>
              <Button
                variant={aoiMode === 'circle' ? "default" : "outline"}
                size="sm"
                onClick={() => startAOI('circle')}
              >
                <Circle className="h-3 w-3 mr-1" />
                Circle
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="p-3 bg-card/95 backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              ARGO Floats
            </h3>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full border border-white"></div>
                <span className="text-xs text-muted-foreground">Good Quality (QC=1)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full border border-white"></div>
                <span className="text-xs text-muted-foreground">Poor Quality (QC=4)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Query Status */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="secondary" className="bg-success/20 text-success">
          <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
          Arabian Sea Focus • 1,247 Floats
        </Badge>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="flex-1 rounded-lg overflow-hidden" />

      {/* Layer Controls */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-card/95 backdrop-blur-sm"
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MapCanvas;