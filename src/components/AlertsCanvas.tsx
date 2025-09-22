import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, MapPin, Thermometer, Droplets, 
  TrendingUp, Eye, Bell, Settings, Download, Filter
} from "lucide-react";

interface AlertsCanvasProps {
  onFloatClick: (floatData: any) => void;
}

const AlertsCanvas = ({ onFloatClick }: AlertsCanvasProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const alerts = [
    {
      id: 'alert_1',
      type: 'temperature',
      severity: 'high',
      title: 'Extreme Temperature Anomaly',
      description: 'Surface temperature +4.2°C above seasonal average in Arabian Sea',
      location: { lat: 18.5, lon: 68.2, region: 'Arabian Sea' },
      timestamp: '2024-01-15T14:30:00Z',
      confidence: 0.92,
      floatIds: ['2900123', '2900124', '2900125'],
      status: 'active'
    },
    {
      id: 'alert_2',
      type: 'salinity',
      severity: 'medium',
      title: 'Freshwater Intrusion Event',
      description: 'Unusual salinity drop detected near major river outflow',
      location: { lat: 21.2, lon: 89.5, region: 'Bay of Bengal' },
      timestamp: '2024-01-14T09:15:00Z',
      confidence: 0.76,
      floatIds: ['2900201', '2900202'],
      status: 'monitoring'
    },
    {
      id: 'alert_3',
      type: 'oxygen',
      severity: 'critical',
      title: 'Oxygen Depletion Zone Expansion',
      description: 'Dissolved oxygen levels dropped below 2 mg/L threshold',
      location: { lat: 15.8, lon: 65.3, region: 'Arabian Sea OMZ' },
      timestamp: '2024-01-13T16:45:00Z',
      confidence: 0.89,
      floatIds: ['2900301', '2900302', '2900303', '2900304'],
      status: 'critical'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'accent';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'temperature': return Thermometer;
      case 'salinity': return Droplets;
      case 'oxygen': return TrendingUp;
      default: return AlertTriangle;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'destructive', label: 'Active' },
      monitoring: { variant: 'secondary', label: 'Monitoring' },
      critical: { variant: 'destructive', label: 'Critical' },
      resolved: { variant: 'secondary', label: 'Resolved' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredAlerts = activeFilter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.severity === activeFilter);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
            Ocean Anomaly Alerts
            <Badge variant="destructive" className="ml-3">
              {alerts.filter(a => a.status === 'active' || a.status === 'critical').length} Active
            </Badge>
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Thresholds
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground mr-2">Filter by severity:</span>
          {['all', 'critical', 'high', 'medium'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="capitalize"
            >
              <Filter className="h-3 w-3 mr-1" />
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Alert Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="border-destructive/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">2</div>
              <div className="text-sm text-muted-foreground">Critical Alerts</div>
            </CardContent>
          </Card>
          <Card className="border-warning/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">1</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          <Card className="border-accent/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">0</div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Alert List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const IconComponent = getSeverityIcon(alert.type);
            const severityColor = getSeverityColor(alert.severity);
            
            return (
              <Alert key={alert.id} className={`border-${severityColor}/30`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-${severityColor}/20`}>
                      <IconComponent className={`h-5 w-5 text-${severityColor}`} />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        {getStatusBadge(alert.status)}
                        <Badge variant="outline" className="text-xs">
                          {Math.round(alert.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      
                      <AlertDescription className="text-sm">
                        {alert.description}
                      </AlertDescription>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location.region}</span>
                        </div>
                        <div>
                          {new Date(alert.timestamp).toLocaleDateString()} {new Date(alert.timestamp).toLocaleTimeString()}
                        </div>
                        <div>
                          {alert.floatIds.length} floats affected
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Zoom to location on map
                        console.log('Zoom to', alert.location);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Open RAG explanation
                        console.log('Explain alert', alert.id);
                      }}
                    >
                      Explain with RAG
                    </Button>
                  </div>
                </div>
              </Alert>
            );
          })}
        </div>

        {/* Alert Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-accent" />
              Alert Frequency Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-r from-destructive/10 via-warning/10 to-accent/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Alert frequency over time
                </p>
                <p className="text-xs text-muted-foreground">
                  Historical anomaly patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Regional Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Arabian Sea</span>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bay of Bengal</span>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">Medium Risk</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertsCanvas;