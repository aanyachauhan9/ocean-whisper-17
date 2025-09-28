import { useState } from "react";
import { 
  BarChart3, Globe, Zap, Shield, Users, TrendingUp, 
  Map, MessageSquare, Filter, Bell, Download, Eye,
  Clock, Layers, Search, Share2 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Features = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const mainFeatures = [
    {
      icon: Globe,
      title: "Interactive Global Map",
      description: "Explore oceanographic data through our intuitive map interface with real-time float positions and measurements.",
      category: "visualization"
    },
    {
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description: "Ask questions about ocean data in natural language and get instant insights powered by advanced AI.",
      category: "ai"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Generate comprehensive reports and visualizations with powerful statistical analysis tools.",
      category: "analytics"
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Get notified about significant oceanic events, data anomalies, and system updates.",
      category: "monitoring"
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Filter data by date, location, depth, variables, and quality control parameters.",
      category: "tools"
    },
    {
      icon: Download,
      title: "Data Export",
      description: "Export data in multiple formats including CSV, NetCDF, and JSON for further analysis.",
      category: "tools"
    },
    {
      icon: Layers,
      title: "Multi-layer Visualization",
      description: "Overlay different data types and time periods to discover patterns and correlations.",
      category: "visualization"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Search through millions of data points with powerful query capabilities.",
      category: "tools"
    },
    {
      icon: Share2,
      title: "Collaboration Tools",
      description: "Share findings, create collaborative workspaces, and publish research insights.",
      category: "collaboration"
    }
  ];

  const categories = [
    { id: "all", label: "All Features" },
    { id: "visualization", label: "Visualization", icon: Eye },
    { id: "ai", label: "AI & Analytics", icon: Zap },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "monitoring", label: "Monitoring", icon: Bell },
    { id: "tools", label: "Tools", icon: Filter },
    { id: "collaboration", label: "Collaboration", icon: Users }
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFeatures = activeCategory === "all" 
    ? mainFeatures 
    : mainFeatures.filter(feature => feature.category === activeCategory);

  const demoSections = [
    {
      id: "map",
      title: "Interactive Mapping",
      description: "Explore global ocean data through our intuitive map interface",
      features: ["Real-time float tracking", "Layered data visualization", "Custom overlays"]
    },
    {
      id: "chat",
      title: "AI Assistant",
      description: "Get instant insights through natural language queries",
      features: ["Natural language processing", "Contextual responses", "Data recommendations"]
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      description: "Powerful tools for statistical analysis and reporting",
      features: ["Statistical modeling", "Trend analysis", "Custom visualizations"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-ocean-50 to-ocean-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              🚀 Platform Capabilities
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Everything You Need for
              <span className="block text-primary">
                Ocean Data Analysis
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              From interactive visualizations to AI-powered insights, FloatChat provides 
              a comprehensive suite of tools for oceanographic research and analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredFeatures.map((feature, index) => (
              <Card key={index} className="status-card group hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">See It in Action</h2>
              <p className="text-xl text-muted-foreground">
                Explore key platform capabilities through interactive demos
              </p>
            </div>

            <Tabs value={activeDemo || "map"} onValueChange={setActiveDemo} className="space-y-8">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                {demoSections.map((section) => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className="flex-col space-y-2 p-6 h-auto"
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-muted-foreground">{section.description}</div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {demoSections.map((section) => (
                <TabsContent key={section.id} value={section.id} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                        <p className="text-muted-foreground text-lg">{section.description}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold">Key Features:</h4>
                        <ul className="space-y-2">
                          {section.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="ocean-button">
                        Try Interactive Demo
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-ocean-700 to-ocean-900 rounded-xl overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-center h-full text-white">
                          <div className="text-center space-y-4">
                            <div className="text-6xl opacity-50">📊</div>
                            <div className="text-lg">Interactive Demo</div>
                            <div className="text-sm opacity-75">{section.title}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/30 rounded-full blur-xl" />
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-xl" />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Performance & Reliability */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for Performance & Scale
              </h2>
              <p className="text-xl text-muted-foreground">
                Enterprise-grade infrastructure ensures reliability and performance at any scale
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Zap, metric: "< 100ms", label: "Average Response Time" },
                { icon: Shield, metric: "99.9%", label: "Uptime Guarantee" },
                { icon: TrendingUp, metric: "50M+", label: "Data Points Processed Daily" }
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">{stat.metric}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;