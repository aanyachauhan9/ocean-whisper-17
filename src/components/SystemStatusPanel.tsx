import { Activity, Thermometer, Droplets, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SystemStatusPanel = () => {
  const statusMetrics = [
    {
      title: "Active Floats",
      value: "1,247",
      change: "+23",
      icon: Activity,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Avg Temperature",
      value: "14.2°C",
      change: "+0.3°C",
      icon: Thermometer,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Avg Salinity",
      value: "35.1 PSU",
      change: "+0.05",
      icon: Droplets,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Last Update",
      value: "2h ago",
      change: "Real-time",
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {statusMetrics.map((metric) => (
          <Card key={metric.title} className="status-card hover:animate-pulse-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <div className={`flex items-center text-sm ${metric.color}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SystemStatusPanel;