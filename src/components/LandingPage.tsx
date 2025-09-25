import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for animated background
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Animated Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        <div className="absolute inset-0 opacity-20">
          {/* Animated dots representing ARGO floats */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0">
        {/* Header */}
        <div className="absolute top-8 left-8 right-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm">
                {isLoading ? 'Loading...' : '4,287 Active ARGO Floats'}
              </span>
            </div>
            <div className="text-white/60 text-sm">
              Real-time Ocean Data
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-2xl px-8">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-bold text-white">
                🌊 <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  FloatChat
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Ask the Ocean
              </p>
              <p className="text-lg text-white/70 max-w-lg mx-auto">
                Conversations with the ocean, powered by AI + ARGO floats
              </p>
            </div>

            {/* Sample Chat Bubble */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 text-sm">
                      "Show me salinity near the equator in March 2023"
                    </p>
                  </div>
                </div>
                <div className="bg-accent/20 rounded-xl p-3 ml-11">
                  <p className="text-white text-sm">
                    <span className="font-semibold">3,284 profiles found.</span> Tap to explore ➜
                  </p>
                </div>
              </div>
            </div>

            {/* Enter App Button */}
            <Button
              onClick={onEnterApp}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-3 rounded-full shadow-2xl hover:shadow-accent/20 transition-all duration-300 group"
            >
              Enter FloatChat
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center justify-between text-white/60 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Global Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>AI-Powered Analysis</span>
              </div>
            </div>
            <div>
              Powered by ARGO + OpenAI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;