import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, BarChart3, Globe, Zap, Shield, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Globe,
      title: "Global Ocean Monitoring",
      description: "Access real-time data from thousands of ARGO floats worldwide, providing comprehensive ocean coverage."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "AI-powered insights and visualizations help you understand complex oceanographic patterns and trends."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Stream live data updates and get instant notifications about significant oceanic events and changes."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous data validation ensures the highest quality measurements for reliable scientific analysis."
    }
  ];

  const stats = [
    { number: "12,000+", label: "Active Floats" },
    { number: "50M+", label: "Data Points" },
    { number: "180+", label: "Countries" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-ocean-50 to-ocean-100">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              🌊 Next-generation oceanographic platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Explore the Ocean's
              <span className="block text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hidden Stories
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Unlock insights from global ocean data with our AI-powered platform. Monitor temperature, salinity, and currents in real-time across the world's oceans.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="ocean-button text-lg px-8">
                <Link to="/explorer">
                  Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => setIsVideoPlaying(true)}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-4 h-4 bg-ocean-500 rounded-full animate-pulse-glow" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features for Ocean Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze and understand oceanographic data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="status-card group hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
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

      {/* Interactive Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              See FloatChat in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience our intuitive interface and powerful analytics tools
            </p>
            
            <div className="relative group">
              <div className="aspect-video bg-gradient-to-br from-ocean-700 to-ocean-900 rounded-xl overflow-hidden shadow-2xl">
                {!isVideoPlaying ? (
                  <div className="flex items-center justify-center h-full">
                    <Button 
                      size="lg" 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur text-white border-white/30"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="mr-3 h-6 w-6 fill-current" />
                      Play Demo Video
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center space-y-4">
                      <div className="animate-pulse">🎥 Demo Video Playing</div>
                      <Button 
                        variant="outline" 
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        onClick={() => setIsVideoPlaying(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Dive Deep into Ocean Data?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join researchers and scientists worldwide who trust FloatChat for their oceanographic analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/explorer">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;