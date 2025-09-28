import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@floatchat.com",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak directly with our team during business hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "San Francisco, CA",
      description: "Schedule a visit to our headquarters"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      country: "United States",
      address: "123 Ocean View Drive\nSan Francisco, CA 94102",
      timezone: "PST (UTC-8)"
    },
    {
      city: "London",
      country: "United Kingdom", 
      address: "456 Thames Street\nLondon, SW1A 1AA",
      timezone: "GMT (UTC+0)"
    },
    {
      city: "Tokyo",
      country: "Japan",
      address: "789 Pacific Plaza\nTokyo, 100-0001",
      timezone: "JST (UTC+9)"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-ocean-50 to-ocean-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              💬 Get In Touch
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Let's Start a
              <span className="block text-primary">
                Conversation
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you have questions about our platform, need technical support, 
              or want to discuss partnership opportunities, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your organization"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="ocean-button w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
                <p className="text-muted-foreground">
                  Prefer to reach out directly? Use any of the methods below to contact our team.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="status-card">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{info.title}</CardTitle>
                          <div className="text-xl font-semibold text-primary mt-1">
                            {info.details}
                          </div>
                          <CardDescription className="mt-2">
                            {info.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              {/* Business Hours */}
              <Card className="status-card">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Business Hours</CardTitle>
                      <CardDescription className="mt-2">
                        Monday - Friday: 9:00 AM - 6:00 PM (PST)<br/>
                        Saturday: 10:00 AM - 4:00 PM (PST)<br/>
                        Sunday: Closed
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Global Presence</h2>
              <p className="text-xl text-muted-foreground">
                We have offices around the world to better serve our international community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index} className="status-card text-center">
                  <CardHeader>
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{office.city}</CardTitle>
                    <Badge variant="secondary">{office.country}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {office.address}
                    </div>
                    <div className="text-sm">
                      <strong>Timezone:</strong> {office.timezone}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  question: "How quickly can I get started with FloatChat?",
                  answer: "You can start exploring ocean data immediately with our free trial. Full onboarding typically takes 24-48 hours for enterprise customers."
                },
                {
                  question: "Do you provide technical support?",
                  answer: "Yes, we offer comprehensive technical support including documentation, tutorials, and direct assistance from our expert team."
                },
                {
                  question: "Can I integrate FloatChat with my existing systems?",
                  answer: "Absolutely! We provide robust APIs and integration tools to connect with your existing data workflows and research platforms."
                },
                {
                  question: "What data sources do you support?",
                  answer: "We integrate with ARGO floats, satellite data, ship-based measurements, and other major oceanographic data sources worldwide."
                }
              ].map((faq, index) => (
                <Card key={index} className="status-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
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

export default Contact;