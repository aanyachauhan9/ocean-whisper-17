import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Filter, Calendar, MapPin, Thermometer, 
  Droplets, Settings, RotateCcw, CheckCircle
} from "lucide-react";

const FiltersSidebar = () => {
  const [dateRange, setDateRange] = useState(['2024-01-01', '2024-12-31']);
  const [depthRange, setDepthRange] = useState([0, 2000]);
  const [qcFilter, setQcFilter] = useState("good-only");
  const [selectedVariables, setSelectedVariables] = useState({
    temperature: true,
    salinity: true,
    pressure: true,
    oxygen: false,
    chlorophyll: false,
    backscatter: false,
  });
  const [selectedRegion, setSelectedRegion] = useState("arabian-sea");

  const oceanRegions = [
    { id: 'global', label: 'Global Ocean', count: '15,247' },
    { id: 'arabian-sea', label: 'Arabian Sea', count: '3,284' },
    { id: 'bay-of-bengal', label: 'Bay of Bengal', count: '2,156' },
    { id: 'indian-ocean', label: 'Indian Ocean', count: '8,931' },
    { id: 'custom', label: 'Custom AOI', count: '0' },
  ];

  const variables = [
    { id: 'temperature', label: 'Temperature', icon: Thermometer, color: 'text-warning' },
    { id: 'salinity', label: 'Salinity', icon: Droplets, color: 'text-primary' },
    { id: 'pressure', label: 'Pressure', icon: Settings, color: 'text-accent' },
    { id: 'oxygen', label: 'Dissolved Oxygen', icon: Settings, color: 'text-success' },
    { id: 'chlorophyll', label: 'Chlorophyll-a', icon: Settings, color: 'text-success' },
    { id: 'backscatter', label: 'Backscatter', icon: Settings, color: 'text-muted-foreground' },
  ];

  const resetFilters = () => {
    setDateRange(['2024-01-01', '2024-12-31']);
    setDepthRange([0, 2000]);
    setQcFilter("good-only");
    setSelectedVariables({
      temperature: true,
      salinity: true,
      pressure: true,
      oxygen: false,
      chlorophyll: false,
      backscatter: false,
    });
    setSelectedRegion("arabian-sea");
  };

  const applyFilters = () => {
    console.log('Applying filters:', {
      dateRange,
      depthRange,
      qcFilter,
      selectedVariables,
      selectedRegion
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2 text-accent" />
          Filters & Settings
        </h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Date Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            Date Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="start-date" className="text-xs text-muted-foreground">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={dateRange[0]}
                onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                className="text-xs"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-xs text-muted-foreground">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange[1]}
                onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                className="text-xs"
              />
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            {Math.ceil((new Date(dateRange[1]).getTime() - new Date(dateRange[0]).getTime()) / (1000 * 60 * 60 * 24))} days selected
          </div>
        </CardContent>
      </Card>

      {/* Ocean Regions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            Ocean Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {oceanRegions.map((region) => (
            <div
              key={region.id}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedRegion === region.id 
                  ? 'border-accent bg-accent/10' 
                  : 'border-border hover:bg-muted/50'
              }`}
              onClick={() => setSelectedRegion(region.id)}
            >
              <div>
                <div className="text-sm font-medium">{region.label}</div>
                <div className="text-xs text-muted-foreground">{region.count} floats available</div>
              </div>
              {selectedRegion === region.id && (
                <CheckCircle className="h-4 w-4 text-accent" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Depth Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Depth Range (dbar)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={depthRange}
              onValueChange={setDepthRange}
              max={2000}
              step={50}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{depthRange[0]} dbar</span>
            <span className="font-medium">
              {depthRange[1] - depthRange[0]} dbar range
            </span>
            <span className="text-muted-foreground">{depthRange[1]} dbar</span>
          </div>
        </CardContent>
      </Card>

      {/* Variables */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Variables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {variables.map((variable) => (
            <div key={variable.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <variable.icon className={`h-4 w-4 ${variable.color}`} />
                <Label htmlFor={variable.id} className="text-sm">
                  {variable.label}
                </Label>
              </div>
              <Switch
                id={variable.id}
                checked={selectedVariables[variable.id as keyof typeof selectedVariables]}
                onCheckedChange={(checked) =>
                  setSelectedVariables(prev => ({
                    ...prev,
                    [variable.id]: checked
                  }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quality Control */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quality Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { id: 'all', label: 'All Data', description: 'Include all quality flags' },
            { id: 'good-only', label: 'Good Quality Only', description: 'QC flag = 1' },
            { id: 'custom', label: 'Custom QC Filter', description: 'Manual selection' },
          ].map((option) => (
            <div
              key={option.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                qcFilter === option.id 
                  ? 'border-accent bg-accent/10' 
                  : 'border-border hover:bg-muted/50'
              }`}
              onClick={() => setQcFilter(option.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
                {qcFilter === option.id && (
                  <CheckCircle className="h-4 w-4 text-accent" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Example Queries */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Queries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Salinity profiles near equator, Mar 2024",
            "Compare BGC parameters in Arabian Sea (last 6 months)",
            "Nearest floats to 10°N, 75°E",
            "Temperature anomalies last month"
          ].map((query, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => console.log('Execute query:', query)}
            >
              <div className="text-xs leading-relaxed">{query}</div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Apply Button */}
      <div className="sticky bottom-0 pt-4">
        <Button onClick={applyFilters} className="w-full">
          <CheckCircle className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FiltersSidebar;