import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface OrgHeaderProps {
  currentTeam: string;
  onChangeOrg: () => void;
  onCreateOrg: () => void;
}

export function OrgHeader({ currentTeam, onChangeOrg, onCreateOrg }: OrgHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-primary">
      <div className="flex items-center gap-4">
        <h1 className="text-primary-foreground font-semibold text-lg">
          Organization Management
        </h1>
        <span className="text-primary-foreground/80">-</span>
        <span className="text-primary-foreground font-medium">{currentTeam}</span>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onChangeOrg}
          className="ml-2"
        >
          Change Org
        </Button>
      </div>
      <Button 
        onClick={onCreateOrg}
        className="bg-card text-primary hover:bg-card/90 border-2 border-primary-foreground/20"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create New Organization
      </Button>
    </div>
  );
}
