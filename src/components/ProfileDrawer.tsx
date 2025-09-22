import { useState } from "react";
import { 
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, 
  DrawerDescription, DrawerClose, DrawerFooter 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, Download, Share, MapPin, Calendar, 
  Thermometer, Droplets, ArrowDown, Info
} from "lucide-react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: any;
}

const ProfileDrawer = ({ isOpen, onClose, profileData }: ProfileDrawerProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!profileData) return null;

  // Mock profile data for visualization
  const temperatureProfile = Array.from({ length: 20 }, (_, i) => ({
    depth: i * 100,
    temperature: 25 - (i * 0.8) + Math.random() * 2,
  }));

  const salinityProfile = Array.from({ length: 20 }, (_, i) => ({
    depth: i * 100,
    salinity: 35 + (i * 0.01) + Math.random() * 0.1 - 0.05,
  }));

  const getQCBadge = (qc: number) => {
    switch (qc) {
      case 1:
        return <Badge className="bg-success/20 text-success">Good Quality</Badge>;
      case 4:
        return <Badge className="bg-destructive/20 text-destructive">Poor Quality</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span>Float {profileData?.platform_id}</span>
              </DrawerTitle>
              <DrawerDescription>
                Cycle {profileData?.cycle_number} • {profileData?.profile_date}
              </DrawerDescription>
            </div>
            <div className="flex items-center space-x-2">
              {getQCBadge(profileData?.qc_flag)}
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-6 mt-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profiles">T-S Profiles</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="overview" className="space-y-4 mt-0">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Thermometer className="h-6 w-6 text-warning mx-auto mb-2" />
                      <div className="text-lg font-bold">{profileData?.temperature}°C</div>
                      <div className="text-xs text-muted-foreground">Surface Temp</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Droplets className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold">{profileData?.salinity}</div>
                      <div className="text-xs text-muted-foreground">Salinity PSU</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <ArrowDown className="h-6 w-6 text-accent mx-auto mb-2" />
                      <div className="text-lg font-bold">{profileData?.depth}m</div>
                      <div className="text-xs text-muted-foreground">Max Depth</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <div className="text-lg font-bold">{profileData?.cycle_number}</div>
                      <div className="text-xs text-muted-foreground">Cycle #</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mini Profiles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Temperature vs Depth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-gradient-to-b from-warning/20 to-primary/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Thermometer className="h-6 w-6 mx-auto mb-1 text-warning" />
                          <p className="text-xs text-muted-foreground">Profile Preview</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Salinity vs Depth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-gradient-to-b from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Droplets className="h-6 w-6 mx-auto mb-1 text-primary" />
                          <p className="text-xs text-muted-foreground">Profile Preview</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profiles" className="mt-0">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-warning" />
                        Temperature Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-b from-warning/10 to-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Detailed T-S profile visualization would appear here
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            (Plotly.js integration)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center">
                        <Droplets className="h-4 w-4 mr-2 text-primary" />
                        T-S Diagram
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Temperature-Salinity diagram
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="metadata" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Float Metadata
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Platform ID:</span>
                          <div className="font-mono">{profileData?.platform_id}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cycle Number:</span>
                          <div className="font-mono">{profileData?.cycle_number}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Profile Date:</span>
                          <div className="font-mono">{profileData?.profile_date}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">QC Flag:</span>
                          <div className="font-mono">{profileData?.qc_flag}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Pressure:</span>
                          <div className="font-mono">{profileData?.depth} dbar</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Institution:</span>
                          <div className="font-mono">INCOIS</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DrawerFooter className="border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export NetCDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </div>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;