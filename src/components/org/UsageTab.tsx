import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, HardDrive, Activity, Zap } from 'lucide-react';

interface UsageMetric {
  id: string;
  label: string;
  current: number;
  max: number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
}

const usageMetrics: UsageMetric[] = [
  { id: '1', label: 'Active Users', current: 67, max: 100, unit: 'users', icon: Users },
  { id: '2', label: 'Storage Used', current: 45, max: 100, unit: 'GB', icon: HardDrive },
  { id: '3', label: 'API Calls (This Month)', current: 850000, max: 1000000, unit: 'calls', icon: Activity },
  { id: '4', label: 'Compute Hours', current: 120, max: 200, unit: 'hours', icon: Zap },
];

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export function UsageTab() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Usage Overview</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {usageMetrics.map((metric) => {
          const Icon = metric.icon;
          const percentage = Math.round((metric.current / metric.max) * 100);
          
          return (
            <Card key={metric.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-medium">{metric.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold">{formatNumber(metric.current)}</span>
                    <span className="text-muted-foreground text-sm">
                      of {formatNumber(metric.max)} {metric.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">{percentage}% utilized</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
