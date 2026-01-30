import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, TrendingUp, Activity, Clock, UserPlus, Settings, Shield } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const usageData = [
  { name: 'Jan', users: 400, sessions: 240 },
  { name: 'Feb', users: 500, sessions: 320 },
  { name: 'Mar', users: 600, sessions: 380 },
  { name: 'Apr', users: 780, sessions: 450 },
  { name: 'May', users: 890, sessions: 520 },
  { name: 'Jun', users: 1020, sessions: 680 },
  { name: 'Jul', users: 1234, sessions: 750 },
];

const apiCallsData = [
  { name: 'Mon', calls: 4000 },
  { name: 'Tue', calls: 5200 },
  { name: 'Wed', calls: 4800 },
  { name: 'Thu', calls: 6100 },
  { name: 'Fri', calls: 5400 },
  { name: 'Sat', calls: 3200 },
  { name: 'Sun', calls: 2800 },
];

const recentActivity = [
  { id: 1, icon: UserPlus, action: 'New user added', user: 'John Smith', time: '2 minutes ago', color: 'text-green-600 bg-green-100' },
  { id: 2, icon: Settings, action: 'SSO settings updated', user: 'Admin', time: '15 minutes ago', color: 'text-blue-600 bg-blue-100' },
  { id: 3, icon: Shield, action: 'Permission changed', user: 'Sarah Connor', time: '1 hour ago', color: 'text-orange-600 bg-orange-100' },
  { id: 4, icon: FileText, action: 'Report generated', user: 'System', time: '2 hours ago', color: 'text-purple-600 bg-purple-100' },
  { id: 5, icon: Users, action: 'Team member invited', user: 'Mike Johnson', time: '3 hours ago', color: 'text-green-600 bg-green-100' },
  { id: 6, icon: Activity, action: 'API key rotated', user: 'DevOps', time: '5 hours ago', color: 'text-red-600 bg-red-100' },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor} mt-1`}>{change}</p>
      </CardContent>
    </Card>
  );
}

export function DashboardTab() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="1,234"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Active Sessions"
          value="342"
          change="+5% from last hour"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Reports Generated"
          value="89"
          change="This week"
          changeType="neutral"
          icon={FileText}
        />
        <StatCard
          title="API Calls"
          value="45.2K"
          change="+18% from last month"
          changeType="positive"
          icon={BarChart3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(142, 76%, 45%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* API Calls Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Weekly API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apiCallsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="calls" fill="hsl(142, 76%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center ${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
