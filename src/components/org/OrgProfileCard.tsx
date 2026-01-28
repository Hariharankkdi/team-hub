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
    <div className="flex items-center justify-between py-6 px-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-xl">
          {organization.logo}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{organization.name}</h2>
          <p className="text-muted-foreground text-sm">/{organization.slug.charAt(0)}_{organization.slug.split('-')[0].toLowerCase()}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch 
            checked={organization.enabled} 
            onCheckedChange={onToggleEnabled}
          />
          <span className="text-sm font-medium">Enabled</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onAdd}>
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
