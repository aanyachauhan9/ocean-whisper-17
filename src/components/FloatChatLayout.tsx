import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatChatHeader from "./FloatChatHeader";
import ChatInterface from "./ChatInterface";
import VisualizationPanel from "./VisualizationPanel";

const FloatChatLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FloatChatHeader />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Chat Panel */}
        <div className="w-full lg:w-1/2 border-r border-border">
          <ChatInterface />
        </div>
        
        {/* Desktop Visualization Panel */}
        <div className="hidden lg:block w-1/2">
          <VisualizationPanel />
        </div>
        
        {/* Mobile Visualization Toggle */}
        <div className="lg:hidden absolute top-4 right-4 z-20">
          <Button
            variant="ocean"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="shadow-float"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Mobile Visualization Panel Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute inset-0 z-10 bg-background">
            <VisualizationPanel />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Powered by ARGO Data + AI</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Real-time Ocean Intelligence</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-accent transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Docs
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              ARGO Portal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FloatChatLayout;