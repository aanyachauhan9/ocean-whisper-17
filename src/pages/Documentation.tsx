import { useState } from "react";
import { Book, Code, Download, ExternalLink, Search, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const docSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Quick start guides and basic concepts",
      items: [
        { title: "Platform Overview", time: "5 min read" },
        { title: "Creating Your First Project", time: "10 min read" },
        { title: "Understanding Ocean Data", time: "15 min read" },
        { title: "Basic Navigation", time: "8 min read" }
      ]
    },
    {
      id: "api-reference",
      title: "API Reference",
      description: "Complete API documentation and examples",
      items: [
        { title: "Authentication", time: "API" },
        { title: "Data Endpoints", time: "API" },
        { title: "Real-time Subscriptions", time: "API" },
        { title: "Rate Limits & Quotas", time: "API" }
      ]
    },
    {
      id: "tutorials",
      title: "Tutorials",
      description: "Step-by-step guides for common tasks",
      items: [
        { title: "Analyzing Temperature Trends", time: "20 min" },
        { title: "Creating Custom Visualizations", time: "25 min" },
        { title: "Setting Up Automated Alerts", time: "15 min" },
        { title: "Exporting Data for Research", time: "12 min" }
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      description: "Connect with third-party tools and services",
      items: [
        { title: "Python SDK", time: "Integration" },
        { title: "R Package", time: "Integration" },
        { title: "MATLAB Toolbox", time: "Integration" },
        { title: "Jupyter Notebooks", time: "Integration" }
      ]
    }
  ];

  const codeExamples = [
    {
      title: "Fetch Float Data",
      language: "Python",
      code: `import floatchat

# Initialize client
client = floatchat.Client(api_key="your_key")

# Fetch temperature data
data = client.get_float_data(
    variable="temperature",
    region="pacific",
    start_date="2024-01-01",
    end_date="2024-01-31"
)

print(f"Retrieved {len(data)} measurements")`
    },
    {
      title: "Real-time Streaming",
      language: "JavaScript",
      code: `const FloatChat = require('floatchat-js');

const client = new FloatChat({
  apiKey: 'your_key'
});

// Subscribe to real-time updates
client.subscribe('temperature-alerts', {
  region: 'atlantic',
  threshold: 25
}, (data) => {
  console.log('New alert:', data);
});`
    },
    {
      title: "Data Analysis",
      language: "R",
      code: `library(floatchat)

# Connect to FloatChat
fc <- floatchat_connect(api_key = "your_key")

# Get salinity profiles
profiles <- get_profiles(
  fc,
  variable = "salinity",
  depth_range = c(0, 2000)
)

# Plot depth profiles
plot_profiles(profiles)`
    }
  ];

  const quickLinks = [
    { title: "API Status", url: "#", external: true },
    { title: "SDK Downloads", url: "#", external: false },
    { title: "Community Forum", url: "#", external: true },
    { title: "GitHub Repository", url: "#", external: true },
    { title: "Bug Reports", url: "#", external: true },
    { title: "Feature Requests", url: "#", external: true }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-ocean-50 to-ocean-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              📚 Documentation
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Developer
              <span className="block text-primary">
                Documentation
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to build with FloatChat. From quick start guides 
              to detailed API references and integration examples.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                asChild
                className="flex items-center space-x-2"
              >
                <a href={link.url} target={link.external ? "_blank" : "_self"}>
                  <span>{link.title}</span>
                  {link.external && <ExternalLink className="h-4 w-4" />}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Documentation */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="guides" className="space-y-8">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                <TabsTrigger value="guides" className="flex-col space-y-2 p-6 h-auto">
                  <Book className="h-6 w-6" />
                  <div className="font-medium">Guides & Tutorials</div>
                </TabsTrigger>
                <TabsTrigger value="api" className="flex-col space-y-2 p-6 h-auto">
                  <Code className="h-6 w-6" />
                  <div className="font-medium">API Reference</div>
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex-col space-y-2 p-6 h-auto">
                  <Download className="h-6 w-6" />
                  <div className="font-medium">Code Examples</div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {docSections.map((section) => (
                    <Card key={section.id} className="status-card">
                      <CardHeader>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {section.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                              <span className="font-medium group-hover:text-primary transition-colors">
                                {item.title}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {item.time}
                                </Badge>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="api" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="status-card">
                      <CardHeader>
                        <CardTitle>API Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Base URL:</span>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              api.floatchat.com
                            </code>
                          </div>
                          <div className="flex justify-between">
                            <span>Version:</span>
                            <Badge variant="secondary">v1</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Auth:</span>
                            <span className="text-xs">API Key</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="status-card">
                      <CardHeader>
                        <CardTitle>Endpoints</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { method: "GET", path: "/floats", desc: "List all floats" },
                            { method: "GET", path: "/data", desc: "Retrieve measurements" },
                            { method: "POST", path: "/alerts", desc: "Create alerts" },
                            { method: "GET", path: "/regions", desc: "List regions" }
                          ].map((endpoint, index) => (
                            <div key={index} className="p-3 border border-border rounded-lg">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                                  {endpoint.method}
                                </Badge>
                                <code className="text-sm">{endpoint.path}</code>
                              </div>
                              <div className="text-xs text-muted-foreground">{endpoint.desc}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2">
                    <Card className="status-card">
                      <CardHeader>
                        <CardTitle>Example Request</CardTitle>
                        <CardDescription>
                          Fetch temperature data for a specific region and time period
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <pre className="text-sm overflow-x-auto">
{`curl -X GET "https://api.floatchat.com/v1/data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "variable": "temperature",
    "region": {
      "bounds": {
        "north": 45,
        "south": 35,
        "east": -120,
        "west": -130
      }
    },
    "date_range": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    }
  }'`}
                            </pre>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Response</h4>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <pre className="text-sm overflow-x-auto">
{`{
  "data": [
    {
      "float_id": "2901234",
      "timestamp": "2024-01-15T12:30:00Z",
      "latitude": 40.5,
      "longitude": -125.3,
      "temperature": 15.2,
      "depth": 10.5
    }
  ],
  "metadata": {
    "count": 1234,
    "quality_flags": ["good", "probably_good"]
  }
}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-8">
                <div className="space-y-8">
                  {codeExamples.map((example, index) => (
                    <Card key={index} className="status-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{example.title}</CardTitle>
                            <CardDescription>
                              Example implementation in {example.language}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">{example.language}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* SDK Downloads */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Official SDKs & Libraries
              </h2>
              <p className="text-xl text-muted-foreground">
                Get started quickly with our official software development kits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Python SDK", 
                  version: "v2.1.0", 
                  downloads: "50K+",
                  install: "pip install floatchat"
                },
                { 
                  name: "JavaScript SDK", 
                  version: "v1.8.2", 
                  downloads: "25K+",
                  install: "npm install floatchat-js"
                },
                { 
                  name: "R Package", 
                  version: "v1.5.0", 
                  downloads: "15K+",
                  install: 'install.packages("floatchat")'
                }
              ].map((sdk, index) => (
                <Card key={index} className="status-card text-center">
                  <CardHeader>
                    <CardTitle className="text-xl">{sdk.name}</CardTitle>
                    <div className="flex justify-center space-x-2">
                      <Badge variant="secondary">{sdk.version}</Badge>
                      <Badge variant="outline">{sdk.downloads}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <code className="text-sm">{sdk.install}</code>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;