import { useState } from "react";
import { Send, MapPin, BarChart3, Settings, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onFloatClick?: (floatData: any) => void;
}

const ChatInterface = ({ onFloatClick }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm FloatChat, your AI assistant for exploring ARGO ocean data. How can I help you analyze ocean floats today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    { text: "Show float locations", icon: MapPin },
    { text: "Temperature profiles in Arabian Sea", icon: BarChart3 },
    { text: "System status overview", icon: Settings },
    { text: "Recent salinity measurements", icon: Compass },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputValue}". Let me analyze the ARGO data and generate some visualizations for you. This is a demo response showing how FloatChat would process your ocean data queries.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={
                message.isUser
                  ? "chat-bubble-user"
                  : "chat-bubble-bot"
              }
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Suggestions */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion) => (
            <Badge
              key={suggestion.text}
              variant="secondary"
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <suggestion.icon className="h-3 w-3 mr-1" />
              {suggestion.text}
            </Badge>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about floats, salinity, temperature profiles..."
            className="ocean-input"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            variant="ocean"
            className="px-4 shadow-float"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;