import { Organization } from '@/types/organization';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Trash2 } from 'lucide-react';

interface OrgProfileCardProps {
  organization: Organization;
  onToggleEnabled: (enabled: boolean) => void;
  onRefresh: () => void;
  onDelete: () => void;
  onAdd: () => void;
}

export function OrgProfileCard({ 
  organization, 
  onToggleEnabled, 
  onRefresh, 
  onDelete,
  onAdd 
}: OrgProfileCardProps) {
  return (
    <div className="flex items-center justify-between py-5 px-6 border-b border-border">
      <div className="flex items-center gap-4">
        <div className="w-[42px] h-[42px] rounded bg-[#F1FF57] text-[#092332] flex items-center justify-center font-bold text-sm">
          Kt
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">{organization.name}</h2>
          <p className="text-muted-foreground text-sm">/k_{organization.slug.split('-')[0].toLowerCase()}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch 
            checked={organization.enabled} 
            onCheckedChange={onToggleEnabled}
          />
          <span className="text-sm font-medium">Enabled</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onAdd} className="h-9 w-9">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRefresh} className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-9 w-9">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
