import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, BarChart3, ArrowLeftRight, Settings, 
  Download, Plus, Minus, TrendingUp
} from "lucide-react";

interface ComparisonsCanvasProps {
  onFloatClick: (floatData: any) => void;
}

const ComparisonsCanvas = ({ onFloatClick }: ComparisonsCanvasProps) => {
  const [activeComparison, setActiveComparison] = useState("regions");
  const [regions, setRegions] = useState([
    { id: 'arabian-sea', name: 'Arabian Sea', color: '#00d4ff', active: true },
    { id: 'bay-of-bengal', name: 'Bay of Bengal', color: '#ff6b6b', active: true },
  ]);

  const addRegion = () => {
    // Mock function - would open region selector
    console.log('Add region for comparison');
  };

  const removeRegion = (regionId: string) => {
    setRegions(regions.filter(r => r.id !== regionId));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <ArrowLeftRight className="h-5 w-5 mr-2 text-accent" />
            Regional Comparisons
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={addRegion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Region
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Parameters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Active Regions */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Comparing:</span>
          {regions.map((region) => (
            <Badge 
              key={region.id}
              variant="secondary" 
              className="flex items-center space-x-2"
              style={{ backgroundColor: `${region.color}20`, color: region.color }}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: region.color }}
              ></div>
              <span>{region.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-destructive/20"
                onClick={() => removeRegion(region.id)}
              >
                <Minus className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeComparison} onValueChange={setActiveComparison} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="regions">Regional Stats</TabsTrigger>
            <TabsTrigger value="profiles">Side-by-Side</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6">
            <TabsContent value="regions" className="space-y-6 mt-0">
              {/* Comparison Statistics */}
              <div className="grid md:grid-cols-2 gap-6">
                {regions.map((region) => (
                  <Card key={region.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: region.color }}
                        ></div>
                        {region.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold">127</div>
                          <div className="text-xs text-muted-foreground">Active Floats</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold">14.2°C</div>
                          <div className="text-xs text-muted-foreground">Avg Temp</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold">35.1</div>
                          <div className="text-xs text-muted-foreground">Avg Salinity</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold">1,847</div>
                          <div className="text-xs text-muted-foreground">Profiles (6M)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Charts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-accent" />
                    Temperature Distribution Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-primary/10 via-accent/10 to-warning/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2 text-accent" />
                      <p className="text-sm text-muted-foreground">
                        Side-by-side histogram comparison
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Temperature ranges by region
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <LineChart className="h-4 w-4 mr-2 text-primary" />
                    Seasonal Trends Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Multi-line temporal comparison
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Monthly averages (last 12 months)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profiles" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Split-View Profile Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {regions.map((region) => (
                      <div key={region.id} className="space-y-2">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: region.color }}
                          ></div>
                          <span className="text-sm font-medium">{region.name}</span>
                        </div>
                        <div className="h-48 bg-gradient-to-b from-warning/10 to-primary/10 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <LineChart className="h-6 w-6 mx-auto mb-1 text-accent" />
                            <p className="text-xs text-muted-foreground">
                              T-S Profile
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Synchronized View Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-4 p-8 bg-muted/30 rounded-lg">
                    <Button variant="outline" size="sm">Sync Zoom</Button>
                    <Button variant="outline" size="sm">Sync Pan</Button>
                    <Button variant="outline" size="sm">Overlay Mode</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-warning" />
                    Regional Anomaly Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Anomaly Items */}
                    <div className="flex items-center justify-between p-4 border border-warning/30 rounded-lg bg-warning/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <div>
                          <div className="font-medium">Temperature Spike</div>
                          <div className="text-sm text-muted-foreground">
                            Arabian Sea: +3.2°C above seasonal average
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-warning border-warning">
                          High Confidence
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-primary/30 rounded-lg bg-primary/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div>
                          <div className="font-medium">Salinity Gradient</div>
                          <div className="text-sm text-muted-foreground">
                            Bay of Bengal: Unusual freshwater intrusion detected
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-primary border-primary">
                          Medium Confidence
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Difference Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-warning/20 via-primary/10 to-destructive/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-warning" />
                      <p className="text-sm text-muted-foreground">
                        Spatial anomaly visualization
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Temperature/Salinity differences from climatology
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ComparisonsCanvas;