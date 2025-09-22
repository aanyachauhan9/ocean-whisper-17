import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize globe
    mapboxgl.accessToken = 'pk.demo.mapbox.com'; // Demo token for showcase
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: { name: 'globe' },
      zoom: 1.5,
      center: [30, 15],
      pitch: 30,
    });

    // Add atmosphere
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(50, 100, 150)',
        'high-color': 'rgb(100, 150, 200)',
        'horizon-blend': 0.2,
      });
      
      // Add ARGO floats simulation
      addArgoFloats();
      setIsLoading(false);
    });

    // Globe rotation
    const secondsPerRevolution = 120;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      if (!map.current || !spinEnabled || userInteracting) return;
      const zoom = map.current.getZoom();
      if (zoom < 3) {
        const center = map.current.getCenter();
        center.lng -= 360 / secondsPerRevolution;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('mouseup', () => { userInteracting = false; spinGlobe(); });
    map.current.on('moveend', spinGlobe);

    const spinInterval = setInterval(spinGlobe, 1000);

    return () => {
      clearInterval(spinInterval);
      map.current?.remove();
    };
  }, []);

  const addArgoFloats = () => {
    if (!map.current) return;

    // Generate random ARGO float positions (simplified for demo)
    const floats = Array.from({ length: 1000 }, (_, i) => ({
      type: 'Feature' as const,
      properties: {
        id: `argo_${i}`,
        status: Math.random() > 0.1 ? 'active' : 'inactive',
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [
          (Math.random() - 0.5) * 360,
          (Math.random() - 0.5) * 160,
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

    // Active floats
    map.current.addLayer({
      id: 'argo-floats-active',
      type: 'circle',
      source: 'argo-floats',
      filter: ['==', ['get', 'status'], 'active'],
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          10, 8
        ],
        'circle-color': '#00d4ff',
        'circle-opacity': 0.8,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ffffff',
      },
    });

    // Inactive floats
    map.current.addLayer({
      id: 'argo-floats-inactive',
      type: 'circle',
      source: 'argo-floats',
      filter: ['==', ['get', 'status'], 'inactive'],
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          10, 4
        ],
        'circle-color': '#666666',
        'circle-opacity': 0.6,
      },
    });

    // Add pulsing animation
    map.current.addLayer({
      id: 'argo-floats-pulse',
      type: 'circle',
      source: 'argo-floats',
      filter: ['==', ['get', 'status'], 'active'],
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 4,
          10, 16
        ],
        'circle-color': '#00d4ff',
        'circle-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 0.1,
          10, 0.3
        ],
      },
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Globe Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40">
        {/* Header */}
        <div className="absolute top-8 left-8 right-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm">
                {isLoading ? 'Loading...' : '4,287 Active ARGO Floats'}
              </span>
            </div>
            <div className="text-white/60 text-sm">
              Real-time Ocean Data
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-2xl px-8">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-bold text-white">
                🌊 <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  FloatChat
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Ask the Ocean
              </p>
              <p className="text-lg text-white/70 max-w-lg mx-auto">
                Conversations with the ocean, powered by AI + ARGO floats
              </p>
            </div>

            {/* Sample Chat Bubble */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 text-sm">
                      "Show me salinity near the equator in March 2023"
                    </p>
                  </div>
                </div>
                <div className="bg-accent/20 rounded-xl p-3 ml-11">
                  <p className="text-white text-sm">
                    <span className="font-semibold">3,284 profiles found.</span> Tap to explore ➜
                  </p>
                </div>
              </div>
            </div>

            {/* Enter App Button */}
            <Button
              onClick={onEnterApp}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-3 rounded-full shadow-2xl hover:shadow-accent/20 transition-all duration-300 group"
            >
              Enter FloatChat
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center justify-between text-white/60 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Global Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>AI-Powered Analysis</span>
              </div>
            </div>
            <div>
              Powered by ARGO + OpenAI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;