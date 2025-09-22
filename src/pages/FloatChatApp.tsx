import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import MainApp from "@/components/MainApp";

const FloatChatApp = () => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <div className="h-screen overflow-hidden">
      {showLanding ? (
        <LandingPage onEnterApp={() => setShowLanding(false)} />
      ) : (
        <MainApp onBackToLanding={() => setShowLanding(true)} />
      )}
    </div>
  );
};

export default FloatChatApp;