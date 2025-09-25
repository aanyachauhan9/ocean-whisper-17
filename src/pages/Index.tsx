import FloatChatApp from "./FloatChatApp";
import { MapboxTokenProvider, MapboxTokenInput, useMapboxToken } from "@/components/MapboxTokenProvider";

const IndexContent = () => {
  const { token } = useMapboxToken();

  if (!token) {
    return <MapboxTokenInput />;
  }

  return <FloatChatApp />;
};

const Index = () => {
  return (
    <MapboxTokenProvider>
      <IndexContent />
    </MapboxTokenProvider>
  );
};

export default Index;
