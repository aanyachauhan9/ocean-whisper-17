import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp, Calendar, BarChart3, LineChart, 
  Filter, Download, Play, Pause, SkipBack, SkipForward
} from "lucide-react";

interface TimeSeriesCanvasProps {
  onFloatClick: (floatData: any) => void;
}

const TimeSeriesCanvas = ({ onFloatClick }: TimeSeriesCanvasProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 100]);
  const [selectedMetric, setSelectedMetric] = useState("temperature");

  const metrics = [
    { id: 'temperature', label: 'Temperature', icon: TrendingUp, color: '#ff6b6b' },
    { id: 'salinity', label: 'Salinity', icon: BarChart3, color: '#00d4ff' },
    { id: 'profiles', label: 'Profile Count', icon: LineChart, color: '#51cf66' },
  ];

  const timeStats = {
    totalProfiles: 12847,
    dateRange: 'Jan 2023 - Dec 2024',
    selectedPeriod: 'Mar 2024',
    avgProfilesPerMonth: 537,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-accent" />
            Time Series Analysis
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Metric Selection */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-muted-foreground mr-2">Metric:</span>
          {metrics.map((metric) => (
            <Button
              key={metric.id}
              variant={selectedMetric === metric.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric(metric.id)}
              className="flex items-center"
            >
              <metric.icon className="h-3 w-3 mr-1" />
              {metric.label}
            </Button>
          ))}
        </div>

        {/* Time Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold">{timeStats.totalProfiles.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Profiles</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="text-sm font-bold">{timeStats.dateRange}</div>
            <div className="text-xs text-muted-foreground">Date Range</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold">{timeStats.avgProfilesPerMonth}</div>
            <div className="text-xs text-muted-foreground">Avg/Month</div>
          </div>
          <div className="text-center p-2 bg-accent/20 rounded-lg">
            <div className="text-sm font-bold text-accent">{timeStats.selectedPeriod}</div>
            <div className="text-xs text-muted-foreground">Selected</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main Time Series Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-accent" />
                {metrics.find(m => m.id === selectedMetric)?.label} Over Time
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-success/20 text-success">
                  Arabian Sea Region
                </Badge>
                <Badge variant="outline">Monthly Aggregation</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-sm text-muted-foreground">
                  Interactive time series visualization
                </p>
                <p className="text-xs text-muted-foreground">
                  Drag to zoom, click data points for details
                </p>
              </div>
              
              {/* Mock trend line */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-px bg-accent/50 relative">
                  <div className="absolute left-1/4 -top-1 w-2 h-2 bg-accent rounded-full"></div>
                  <div className="absolute left-1/2 -top-2 w-2 h-2 bg-warning rounded-full"></div>
                  <div className="absolute left-3/4 -top-1 w-2 h-2 bg-success rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Brush Control */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>Time Period Selection</span>
              <div className="flex items-center space-x-1">
                <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jan 2023</span>
                <span className="font-medium">Selected: Mar 2024</span>
                <span className="text-muted-foreground">Dec 2024</span>
              </div>
              
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                max={100}
                step={1}
                className="w-full"
              />
              
              <div className="h-16 bg-gradient-to-r from-primary/20 via-accent/20 to-success/20 rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Mini timeline visualization</p>
                </div>
                {/* Selection indicator */}
                <div 
                  className="absolute top-0 bottom-0 bg-accent/30 border-l-2 border-r-2 border-accent"
                  style={{ left: `${timeRange[0]}%`, width: `${timeRange[1] - timeRange[0]}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-primary" />
              Seasonal Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Monthly Distribution</h4>
                <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Profile count by month</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Anomaly Detection</h4>
                <div className="h-32 bg-gradient-to-r from-warning/10 to-destructive/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-6 w-6 mx-auto mb-1 text-warning" />
                    <p className="text-xs text-muted-foreground">Seasonal anomalies</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Statistical Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold">14.2°C</div>
                <div className="text-xs text-muted-foreground">Mean</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold">±2.8°C</div>
                <div className="text-xs text-muted-foreground">Std Dev</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold">8.1°C</div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold">28.9°C</div>
                <div className="text-xs text-muted-foreground">Max</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeSeriesCanvas;