import React, { createContext, useContext, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';

interface MapboxTokenContextType {
  token: string | null;
  setToken: (token: string) => void;
}

const MapboxTokenContext = createContext<MapboxTokenContextType | undefined>(undefined);

export const useMapboxToken = () => {
  const context = useContext(MapboxTokenContext);
  if (context === undefined) {
    throw new Error('useMapboxToken must be used within a MapboxTokenProvider');
  }
  return context;
};

interface MapboxTokenProviderProps {
  children: React.ReactNode;
}

export const MapboxTokenProvider: React.FC<MapboxTokenProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem('mapbox_token', newToken);
  };

  return (
    <MapboxTokenContext.Provider value={{ token, setToken }}>
      {children}
    </MapboxTokenContext.Provider>
  );
};

interface MapboxTokenInputProps {
  onTokenSet?: () => void;
}

export const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onTokenSet }) => {
  const { setToken } = useMapboxToken();
  const [inputToken, setInputToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.trim()) {
      setToken(inputToken.trim());
      onTokenSet?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Mapbox Token Required</h2>
            <p className="text-sm text-muted-foreground">Enter your Mapbox public token to use maps</p>
          </div>
        </div>
        
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-warning">Get your free token:</p>
              <p className="text-muted-foreground">
                1. Go to <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-accent underline">mapbox.com</a>
              </p>
              <p className="text-muted-foreground">
                2. Sign up/Login and find "Tokens" in your dashboard
              </p>
              <p className="text-muted-foreground">
                3. Copy your public token (starts with "pk.")
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOi..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="font-mono text-sm"
          />
          <Button type="submit" className="w-full" disabled={!inputToken.trim()}>
            Continue to FloatChat
          </Button>
        </form>
      </Card>
    </div>
  );
};