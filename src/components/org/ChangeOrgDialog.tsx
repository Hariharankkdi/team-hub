import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Organization } from '@/types/organization';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface ChangeOrgDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizations: Organization[];
  currentOrg: Organization;
  onSelectOrg: (org: Organization) => void;
}

const allOrganizations = [
  { id: '1', name: 'Katana Admin', logo: 'Kt' },
  { id: '2', name: 'Globex Corporation', logo: 'Kt' },
  { id: '3', name: 'Initech', logo: 'Kt' },
  { id: '4', name: 'Stark Industries', logo: 'Kt' },
  { id: '5', name: 'Wayne Enterprises', logo: 'Kt' },
  { id: '6', name: 'Cyberdyne Systems', logo: 'Kt' },
  { id: '7', name: 'Oscorp', logo: 'Kt' },
  { id: '8', name: 'Umbrella Corporation', logo: 'Kt' },
  { id: '9', name: 'Aperture Science', logo: 'Kt' },
];

const recentlyVisitedOrgs = ['Global Relations', 'Finance Division', 'HR Department'];

export function ChangeOrgDialog({
  open,
  onOpenChange,
  organizations,
  currentOrg,
  onSelectOrg,
}: ChangeOrgDialogProps) {
  const [parentSearch, setParentSearch] = useState('');
  const [recentSearch, setRecentSearch] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<string | null>(currentOrg.id);

  const filteredOrgs = allOrganizations.filter(org =>
    org.name.toLowerCase().includes(parentSearch.toLowerCase())
  );

  const filteredRecentOrgs = recentlyVisitedOrgs.filter(org =>
    org.toLowerCase().includes(recentSearch.toLowerCase())
  );

  const handleSave = () => {
    if (selectedOrg) {
      const org = organizations.find(o => o.id === selectedOrg);
      if (org) {
        onSelectOrg(org);
      }
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">Change Organization</DialogTitle>
        </DialogHeader>
        
        <div className="flex min-h-[500px]">
          {/* Left Panel - Parent Organizations */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Parent Organizations"
                  value={parentSearch}
                  onChange={(e) => setParentSearch(e.target.value)}
                  className="pl-9 bg-muted/50 border-0"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrg(org.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50',
                    selectedOrg === org.id && 'bg-muted/50'
                  )}
                >
                  <div className="w-8 h-8 rounded bg-[#E5F530] text-black flex items-center justify-center font-bold text-xs">
                    {org.logo}
                  </div>
                  <span className="text-sm font-medium">{org.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Recently Visited */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex items-center justify-between gap-4">
              <h3 className="text-base font-medium text-muted-foreground">Recently visited Org</h3>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={recentSearch}
                  onChange={(e) => setRecentSearch(e.target.value)}
                  className="pl-9 bg-muted/50 border-0"
                />
              </div>
            </div>
            
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {filteredRecentOrgs.map((org) => (
                <button
                  key={org}
                  className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded transition-colors"
                >
                  {org}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
