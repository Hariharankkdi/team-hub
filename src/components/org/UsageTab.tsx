import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Command, Database, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type TimeFilter = 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days' | 'Last year';

const timeFilters: TimeFilter[] = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last year'];

interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down';
  bgColor: string;
}

const statCards: StatCard[] = [
  { 
    id: '1', 
    label: 'Active users', 
    value: '1,234', 
    icon: Users, 
    trend: 'down',
    bgColor: 'bg-yellow-100'
  },
  { 
    id: '2', 
    label: 'API Calls', 
    value: '45.2K', 
    icon: Command, 
    trend: 'up',
    bgColor: 'bg-green-100'
  },
  { 
    id: '3', 
    label: 'Storage Used', 
    value: '2.5 GB', 
    icon: Database, 
    trend: 'up',
    bgColor: 'bg-slate-200'
  },
  { 
    id: '4', 
    label: 'Average Session', 
    value: '24m', 
    icon: Clock, 
    trend: 'down',
    bgColor: 'bg-yellow-50'
  },
];

const chartData = [
  { name: 'JAN', apiCalls: 2000000, activeUsers: 1800000 },
  { name: 'FEB', apiCalls: 2800000, activeUsers: 2700000 },
  { name: 'MAR', apiCalls: 2900000, activeUsers: 2600000 },
  { name: 'APR', apiCalls: 3300000, activeUsers: 3200000 },
  { name: 'MAY', apiCalls: 1800000, activeUsers: 2800000 },
  { name: 'JUN', apiCalls: 3200000, activeUsers: 2000000 },
  { name: 'JUL', apiCalls: 3700000, activeUsers: 1700000 },
  { name: 'AUG', apiCalls: 3600000, activeUsers: 3000000 },
  { name: 'SEP', apiCalls: 3600000, activeUsers: 2500000 },
  { name: 'OCT', apiCalls: 3400000, activeUsers: 3200000 },
  { name: 'NOV', apiCalls: 3600000, activeUsers: 2800000 },
  { name: 'DEC', apiCalls: 4200000, activeUsers: 2000000 },
];

const formatYAxis = (value: number) => {
  if (value === 0) return '0';
  if (value >= 1000000) return `$${value / 1000000}M`;
  return `$${value / 1000}K`;
};

export function UsageTab() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('Last 30 Days');

  return (
    <div className="p-6">
      {/* Time Filter Buttons */}
      <div className="flex items-center gap-2 mb-6">
        {timeFilters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'rounded-full px-4',
              activeFilter === filter 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'bg-background hover:bg-muted'
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id} className={cn('border-0', stat.bgColor)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Usage Over Time Chart */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Usage Over Time</h3>
      </div>

      <Card className="border border-border">
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 5000000]}
                ticks={[0, 1000000, 2000000, 3000000, 4000000, 5000000]}
              />
              <Tooltip 
                formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend 
                verticalAlign="top" 
                align="right"
                wrapperStyle={{ paddingBottom: 20 }}
                formatter={(value) => (
                  <span style={{ color: '#374151', fontSize: 14 }}>{value}</span>
                )}
              />
              <Line 
                type="linear" 
                dataKey="apiCalls" 
                name="API Calls"
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="linear" 
                dataKey="activeUsers" 
                name="Active users"
                stroke="#93c5fd" 
                strokeWidth={2}
                dot={{ fill: '#93c5fd', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
