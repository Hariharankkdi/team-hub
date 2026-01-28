import { Organization } from '@/types/organization';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

interface ProfileTabProps {
  organization: Organization;
  onEditProfile: () => void;
}

interface ProfileFieldProps {
  label: string;
  value: string | number;
  isBadge?: boolean;
}

function ProfileField({ label, value, isBadge }: ProfileFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      {isBadge ? (
        <Badge variant="secondary" className="font-normal">
          {value}
        </Badge>
      ) : (
        <p className="font-medium text-foreground">{value}</p>
      )}
    </div>
  );
}

export function ProfileTab({ organization, onEditProfile }: ProfileTabProps) {
  return (
    <div className="p-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-x-16 gap-y-5">
            <ProfileField label="Name" value={organization.name} />
            <ProfileField label="Slug" value={organization.slug} />
            
            <ProfileField label="Description" value={organization.description} />
            <ProfileField label="Industry" value={organization.industry} />
            
            <ProfileField label="Max Users" value={organization.maxUsers} />
            <ProfileField label="Tier" value={organization.tier} />
            
            <ProfileField label="Contact Email" value={organization.contactEmail} />
            <ProfileField label="Phone Number" value={organization.phoneNumber} />
            
            <ProfileField label="Domain" value={organization.domain} isBadge />
            <ProfileField label="Location" value={organization.location} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
