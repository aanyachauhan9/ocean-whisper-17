import { Activity, Thermometer, Waves, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FloatChatHeader = () => {
  return (
    <header className="bg-ocean-depth border-b border-border/20 px-6 py-4 relative overflow-hidden">
      {/* Subtle wave pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="wave-animation absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent transform -translate-x-full animate-pulse"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/20 rounded-lg animate-float">
              <Waves className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                FloatChat 🌊
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                AI-Powered ARGO Ocean Data Explorer
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Activity className="h-4 w-4 text-success animate-pulse-glow" />
              <span className="text-sm font-medium">1,247 Active Floats</span>
            </div>
            
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Thermometer className="h-4 w-4 text-warning" />
              <span className="text-sm">14.2°C Avg</span>
            </div>
            
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm">35.1 PSU</span>
            </div>
          </div>

          <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
            System Online
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default FloatChatHeader;