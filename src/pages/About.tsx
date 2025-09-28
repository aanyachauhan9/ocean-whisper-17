import { Users, Target, Award, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Oceanographer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "20+ years in oceanographic research, former NOAA researcher"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Data Scientist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Machine learning expert specializing in environmental data analysis"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Marine Systems Engineer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Expert in autonomous ocean monitoring systems and IoT sensors"
    },
    {
      name: "Thomas Kim",
      role: "Platform Architect",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack engineer with expertise in scalable data platforms"
    }
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Impact",
      description: "We believe ocean health affects everyone. Our platform democratizes access to critical oceanographic data for researchers worldwide."
    },
    {
      icon: Target,
      title: "Scientific Precision",
      description: "Every feature is built with scientific rigor in mind, ensuring accuracy and reliability in all data processing and analysis."
    },
    {
      icon: Users,
      title: "Collaborative Science",
      description: "We foster collaboration between researchers, institutions, and governments to accelerate ocean understanding."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from data quality to user experience and platform reliability."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-ocean-50 to-ocean-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              🌊 Our Story
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Advancing Ocean Science
              <span className="block text-primary">
                Through Technology
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              FloatChat was born from the vision to make oceanographic data more accessible, 
              understandable, and actionable for researchers, policymakers, and ocean enthusiasts worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We're on a mission to revolutionize how scientists and researchers interact with ocean data. 
                    By combining cutting-edge AI technology with comprehensive oceanographic datasets, we're 
                    breaking down barriers to ocean understanding and accelerating scientific discovery.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Why It Matters</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The ocean covers 71% of our planet and plays a critical role in climate regulation, 
                    weather patterns, and marine ecosystems. Yet, it remains one of the least understood 
                    environments on Earth. Our platform makes this vital data accessible to everyone.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-2xl p-8 text-white">
                  <div className="h-full flex flex-col justify-center space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">2019</div>
                      <div className="text-ocean-100">Founded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold">50+</div>
                      <div className="text-ocean-100">Research Institutions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold">180</div>
                      <div className="text-ocean-100">Countries Served</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/30 rounded-full animate-float" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="status-card group hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {value.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate experts dedicated to advancing ocean science
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="status-card group text-center hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="relative mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                    />
                    <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary">{member.role}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
              <p className="text-xl text-muted-foreground">
                Key milestones in our mission to democratize ocean data
              </p>
            </div>
            
            <div className="space-y-12">
              {[
                {
                  year: "2019",
                  title: "Foundation",
                  description: "FloatChat was founded with the vision to make ocean data accessible to everyone."
                },
                {
                  year: "2020",
                  title: "First Platform Launch",
                  description: "Released our initial platform with basic data visualization capabilities."
                },
                {
                  year: "2021",
                  title: "AI Integration",
                  description: "Introduced AI-powered analytics and predictive modeling features."
                },
                {
                  year: "2022",
                  title: "Global Expansion",
                  description: "Partnered with research institutions across 50 countries."
                },
                {
                  year: "2023",
                  title: "Real-time Processing",
                  description: "Launched real-time data processing and alert systems."
                },
                {
                  year: "2024",
                  title: "Next Generation Platform",
                  description: "Released our most advanced platform with enhanced collaboration tools."
                }
              ].map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;