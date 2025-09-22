import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Map, BarChart3, LineChart, TrendingUp, AlertTriangle, 
  Settings, Menu, Star, Download, Share, Globe
} from "lucide-react";
import ChatInterface from "./ChatInterface";
import MapCanvas from "./MapCanvas";
import ProfilesCanvas from "./ProfilesCanvas";
import ComparisonsCanvas from "./ComparisonsCanvas";
import TimeSeriesCanvas from "./TimeSeriesCanvas";
import AlertsCanvas from "./AlertsCanvas";
import SystemPulse from "./SystemPulse";
import FiltersSidebar from "./FiltersSidebar";
import ProfileDrawer from "./ProfileDrawer";

interface MainAppProps {
  onBackToLanding: () => void;
}

const MainApp = ({ onBackToLanding }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState("map");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabOptions = [
    { id: "map", label: "🗺️ Map", icon: Map, component: MapCanvas },
    { id: "profiles", label: "📈 Profiles", icon: BarChart3, component: ProfilesCanvas },
    { id: "comparisons", label: "📊 Comparisons", icon: LineChart, component: ComparisonsCanvas },
    { id: "timeseries", label: "📅 Time Series", icon: TrendingUp, component: TimeSeriesCanvas },
    { id: "alerts", label: "🚨 Alerts", icon: AlertTriangle, component: AlertsCanvas },
  ];

  const handleFloatClick = (floatData: any) => {
    setSelectedProfile(floatData);
    setIsProfileDrawerOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackToLanding}
            className="hover:bg-accent/10"
          >
            <Globe className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">🌊 FloatChat</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Ocean Explorer</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SystemPulse />
          
          {/* Desktop Filters Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Settings className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <FiltersSidebar />
            </SheetContent>
          </Sheet>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div className={`
          ${isMobileMenuOpen ? 'hidden' : 'flex'} 
          md:flex flex-col w-full md:w-1/3 border-r border-border
        `}>
          <ChatInterface onFloatClick={handleFloatClick} />
        </div>

        {/* Exploration Canvas */}
        <div className={`
          ${isMobileMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col flex-1
        `}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            {/* Tab Navigation */}
            <div className="border-b border-border px-6 py-3">
              <TabsList className="grid w-full grid-cols-5">
                {tabOptions.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-xs px-2 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    <tab.icon className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">{tab.label.replace(/^.{2}\s/, '')}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {tabOptions.map((tab) => {
                const Component = tab.component;
                return (
                  <TabsContent
                    key={tab.id}
                    value={tab.id}
                    className="h-full m-0 p-0"
                  >
                    <Component onFloatClick={handleFloatClick} />
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>

          {/* Action Bar */}
          <div className="border-t border-border px-6 py-3 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Pin View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        profileData={selectedProfile}
      />

      {/* Mobile Filters Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute inset-0 bg-background z-50 flex flex-col">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters & Settings</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <FiltersSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainApp;