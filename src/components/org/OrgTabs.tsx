import { OrgTab } from '@/types/organization';
import { cn } from '@/lib/utils';
import { LayoutGrid, Users, FileText, BarChart3, Shield } from 'lucide-react';

interface OrgTabsProps {
  activeTab: OrgTab;
  onTabChange: (tab: OrgTab) => void;
}

const tabs: { id: OrgTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'profile', label: 'Profile', icon: LayoutGrid },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'permissions', label: 'Permissions', icon: Shield },
];

export function OrgTabs({ activeTab, onTabChange }: OrgTabsProps) {
  return (
    <div className="border-b border-border px-6">
      <nav className="flex gap-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-[3px] -mb-px',
                isActive
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
