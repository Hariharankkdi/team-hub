import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Organization } from '@/types/organization';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChangeOrgDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizations: Organization[];
  currentOrg: Organization;
  onSelectOrg: (org: Organization) => void;
}

export function ChangeOrgDialog({
  open,
  onOpenChange,
  organizations,
  currentOrg,
  onSelectOrg,
}: ChangeOrgDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Organization</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                onSelectOrg(org);
                onOpenChange(false);
              }}
              className={cn(
                'w-full flex items-center gap-4 p-3 rounded-lg transition-colors text-left',
                currentOrg.id === org.id
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm">
                {org.logo}
              </div>
              <div className="flex-1">
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-muted-foreground">{org.tier} • {org.industry}</p>
              </div>
              {currentOrg.id === org.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
