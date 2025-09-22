import { useState } from "react";
import { Map, BarChart3, LineChart, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SystemStatusPanel from "./SystemStatusPanel";
import oceanHeroBg from "@/assets/ocean-hero-bg.jpg";

const VisualizationPanel = () => {
  const [activeView, setActiveView] = useState<"map" | "charts" | "status">("status");

  const viewOptions = [
    { id: "map", label: "Float Map", icon: Map },
    { id: "charts", label: "Profiles", icon: BarChart3 },
    { id: "status", label: "Status", icon: LineChart },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case "map":
        return (
          <Card className="h-96 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${oceanHeroBg})` }}
            >
              <div className="absolute inset-0 bg-primary/20"></div>
            </div>
            <div className="relative z-10 p-6 h-full flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <Map className="h-12 w-12 mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-semibold mb-2">Interactive Ocean Map</h3>
                <p className="text-sm text-primary-foreground/80">
                  Float locations and trajectories will appear here
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    1,247 Active Floats
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    Arabian Sea Focus
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        );
      
      case "charts":
        return (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Temperature vs Depth Profile</h3>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="h-48 bg-gradient-to-b from-accent/10 to-primary/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-accent animate-pulse" />
                  <p className="text-sm text-muted-foreground">Profile visualization</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Salinity Distribution</h3>
                <Badge variant="outline">QC: Good Only</Badge>
              </div>
              <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Salinity trends</p>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "status":
      default:
        return <SystemStatusPanel />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* View Toggle */}
      <div className="p-6 border-b border-border">
        <div className="flex space-x-2">
          {viewOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeView === option.id ? "ocean" : "outline"}
              size="sm"
              onClick={() => setActiveView(option.id as any)}
            >
              <option.icon className="h-4 w-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderActiveView()}
      </div>

      {/* Quality Control Footer */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-success border-success/30">
              <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
              QC: Valid Data
            </Badge>
            <span className="text-muted-foreground">
              Region: Global Ocean
            </span>
          </div>
          <div className="text-muted-foreground">
            Last refresh: 2 minutes ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;