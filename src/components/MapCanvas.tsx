import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Layers, Square, Circle } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapCanvasProps {
  onFloatClick: (floatData: any) => void;
}

const MapCanvas = ({ onFloatClick }: MapCanvasProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [aoiMode, setAoiMode] = useState<'none' | 'rectangle' | 'circle'>('none');
  const floatMarkersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Fix for default markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    map.current = L.map(mapContainer.current, {
      center: [20, 65], // Arabian Sea
      zoom: 4,
      zoomControl: false,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add zoom control to top right
    L.control.zoom({ position: 'topright' }).addTo(map.current);

    // Initialize layer group for float markers
    floatMarkersRef.current = L.layerGroup().addTo(map.current);

    setMapLoaded(true);
    addArgoFloats();
    addRegionBoundaries();

    return () => {
      map.current?.remove();
    };
  }, []);

  const addArgoFloats = () => {
    if (!map.current || !floatMarkersRef.current) return;

    // Clear existing markers
    floatMarkersRef.current.clearLayers();

    // Generate sample ARGO float data
    const floats = Array.from({ length: 200 }, (_, i) => ({
      id: `argo_${i}`,
      platform_id: `${2900000 + i}`,
      cycle_number: Math.floor(Math.random() * 100) + 1,
      profile_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      qc_flag: Math.random() > 0.1 ? 1 : 4, // 1 = good, 4 = bad
      temperature: (Math.random() * 30 + 5).toFixed(1),
      salinity: (Math.random() * 5 + 33).toFixed(2),
      depth: Math.floor(Math.random() * 2000) + 100,
      lat: 5 + Math.random() * 30,   // Latitude
      lng: 50 + Math.random() * 30,  // Longitude
    }));

    // Add markers for each float
    floats.forEach(float => {
      const isGoodQuality = float.qc_flag === 1;
      
      const marker = L.circleMarker([float.lat, float.lng], {
        radius: isGoodQuality ? 6 : 4,
        fillColor: isGoodQuality ? '#00d4ff' : '#ff6b6b',
        color: '#ffffff',
        weight: isGoodQuality ? 2 : 1,
        opacity: 1,
        fillOpacity: isGoodQuality ? 0.8 : 0.6
      });

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">ARGO Float ${float.platform_id}</h3>
          <p><strong>Cycle:</strong> ${float.cycle_number}</p>
          <p><strong>Date:</strong> ${float.profile_date}</p>
          <p><strong>Temperature:</strong> ${float.temperature}°C</p>
          <p><strong>Salinity:</strong> ${float.salinity} PSU</p>
          <p><strong>Depth:</strong> ${float.depth}m</p>
          <p><strong>QC:</strong> ${isGoodQuality ? 'Good' : 'Poor'}</p>
        </div>
      `);

      marker.on('click', () => {
        onFloatClick(float);
      });

      floatMarkersRef.current?.addLayer(marker);
    });
  };

  const addRegionBoundaries = () => {
    if (!map.current) return;

    // Arabian Sea boundary (simplified)
    const arabianSeaBoundary = [
      [5, 50], [5, 80], [30, 80], [30, 50], [5, 50]
    ] as [number, number][];

    const polygon = L.polygon(arabianSeaBoundary, {
      color: '#00d4ff',
      fillColor: '#00d4ff',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '5, 5'
    });

    polygon.addTo(map.current);
    polygon.bindPopup('<strong>Arabian Sea</strong><br/>Primary study region');
  };

  const zoomToRegion = (region: string) => {
    if (!map.current) return;
    
    setSelectedRegion(region);
    
    const regions = {
      'arabian-sea': { center: [17.5, 65] as [number, number], zoom: 5 },
      'bay-of-bengal': { center: [15, 88] as [number, number], zoom: 5 },
      'indian-ocean': { center: [0, 75] as [number, number], zoom: 3 },
      'global': { center: [0, 0] as [number, number], zoom: 2 },
    };

    const regionData = regions[region as keyof typeof regions];
    if (regionData) {
      map.current.flyTo(regionData.center, regionData.zoom, {
        duration: 2
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