import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, Thermometer, Droplets, Database, 
  Clock, Wifi, AlertCircle, CheckCircle 
} from "lucide-react";

const SystemPulse = () => {
  const [systemStatus, setSystemStatus] = useState({
    activeFloats: 4287,
    avgTempAt1000: 14.2,
    avgSalinity: 35.1,
    lastIngest: '2 minutes ago',
    vectorDbSync: 'synced',
    overallStatus: 'operational'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        activeFloats: prev.activeFloats + Math.floor(Math.random() * 3) - 1,
        avgTempAt1000: prev.avgTempAt1000 + (Math.random() - 0.5) * 0.1,
        avgSalinity: prev.avgSalinity + (Math.random() - 0.5) * 0.01,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
    case 'operational': return <CheckCircle className="h-3 w-3" />;
      case 'warning': return <AlertCircle className="h-3 w-3" />;
      case 'error': return <AlertCircle className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  return (
    <div className="relative">
      {/* Status Indicator */}
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.overallStatus)} animate-pulse`}></div>
        <span className="text-sm text-muted-foreground hidden md:inline">System Status</span>
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <Card className="absolute top-8 right-0 w-80 bg-card/95 backdrop-blur-sm border shadow-lg z-50">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  System Pulse
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(systemStatus.overallStatus)}/20 text-${systemStatus.overallStatus}`}
                >
                  {getStatusIcon(systemStatus.overallStatus)}
                  <span className="ml-1 capitalize">{systemStatus.overallStatus}</span>
                </Badge>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Active Floats */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Wifi className="h-4 w-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {systemStatus.activeFloats.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Floats (30d)</div>
                </div>

                {/* Avg Temperature */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Thermometer className="h-4 w-4 text-warning" />
                    <span className="text-xs text-muted-foreground">@1000db</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {systemStatus.avgTempAt1000.toFixed(1)}°C
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Temp</div>
                </div>

                {/* Avg Salinity */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">PSU</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {systemStatus.avgSalinity.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Salinity</div>
                </div>

                {/* Last Ingest */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Clock className="h-4 w-4 text-success" />
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {systemStatus.lastIngest}
                  </div>
                  <div className="text-xs text-muted-foreground">Last Update</div>
                </div>
              </div>

              {/* Vector DB Status */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-accent" />
                  <span className="text-sm text-foreground">Vector DB</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-success/20 text-success"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {systemStatus.vectorDbSync}
                </Badge>
              </div>

              {/* Performance Meters */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Query Performance</span>
                  <span className="text-xs text-success">Excellent</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-4/5"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Data Coverage</span>
                  <span className="text-xs text-accent">Global</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SystemPulse;