import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, Thermometer, Droplets, ArrowUpDown, 
  Filter, Download, TrendingUp
} from "lucide-react";

interface ProfilesCanvasProps {
  onFloatClick: (floatData: any) => void;
}

const ProfilesCanvas = ({ onFloatClick }: ProfilesCanvasProps) => {
  const mockProfiles = [
    {
      id: 'profile_1',
      platform_id: '2900001',
      date: '2024-01-15',
      qc: 1,
      maxDepth: 2000,
      tempRange: [4.2, 28.5],
      salinityRange: [34.1, 36.8]
    },
    {
      id: 'profile_2', 
      platform_id: '2900002',
      date: '2024-01-14',
      qc: 1,
      maxDepth: 1800,
      tempRange: [5.1, 29.2],
      salinityRange: [34.3, 36.5]
    },
    {
      id: 'profile_3',
      platform_id: '2900003', 
      date: '2024-01-13',
      qc: 4,
      maxDepth: 1500,
      tempRange: [6.8, 27.1],
      salinityRange: [34.8, 36.2]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-accent" />
            Temperature & Salinity Profiles
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              QC Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-success/20 text-success">
            <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
            34 Profiles Found
          </Badge>
          <Badge variant="outline">Arabian Sea Region</Badge>
          <Badge variant="outline">March 2024</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6">
          {/* Main Profile Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-warning" />
                  Temperature vs Depth Profile
                </span>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Multi-Profile
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-b from-warning/10 via-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-accent animate-pulse" />
                  <p className="text-muted-foreground mb-2">Interactive Profile Visualization</p>
                  <p className="text-xs text-muted-foreground">
                    Temperature profiles with pressure axis (0-2000 dbar)
                  </p>
                </div>
                
                {/* Mock axis labels */}
                <div className="absolute left-2 top-2 text-xs text-muted-foreground">0 dbar</div>
                <div className="absolute left-2 bottom-2 text-xs text-muted-foreground">2000 dbar</div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                  Temperature (°C)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salinity Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Droplets className="h-4 w-4 mr-2 text-primary" />
                Salinity vs Depth Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-b from-primary/10 via-accent/10 to-primary/20 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <Droplets className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Salinity Distribution</p>
                  <p className="text-xs text-muted-foreground">34.0 - 36.8 PSU</p>
                </div>

                <div className="absolute left-2 top-2 text-xs text-muted-foreground">0 dbar</div>
                <div className="absolute left-2 bottom-2 text-xs text-muted-foreground">2000 dbar</div>
              </div>
            </CardContent>
          </Card>

          {/* T-S Diagram */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-accent" />
                Temperature-Salinity Diagram
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-warning/10 via-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">T-S Scatter Plot</p>
                  <p className="text-xs text-muted-foreground">Water mass identification</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Carousel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Carousel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockProfiles.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onFloatClick(profile)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-mono">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-mono text-sm">{profile.platform_id}</div>
                        <div className="text-xs text-muted-foreground">{profile.date}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-xs text-center">
                        <div className="text-muted-foreground">Depth</div>
                        <div className="font-mono">{profile.maxDepth}m</div>
                      </div>
                      <div className="text-xs text-center">
                        <div className="text-muted-foreground">Temp</div>
                        <div className="font-mono">{profile.tempRange[0]}° - {profile.tempRange[1]}°</div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={profile.qc === 1 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}
                      >
                        QC={profile.qc}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilesCanvas;