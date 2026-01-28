import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, FileEdit, Eye, Trash2, Settings } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: {
    admin: boolean;
    member: boolean;
    viewer: boolean;
  };
}

const permissions: Permission[] = [
  {
    id: '1',
    name: 'View Organization',
    description: 'Access organization dashboard and basic information',
    icon: Eye,
    roles: { admin: true, member: true, viewer: true },
  },
  {
    id: '2',
    name: 'Manage Users',
    description: 'Add, remove, and modify user access',
    icon: Users,
    roles: { admin: true, member: false, viewer: false },
  },
  {
    id: '3',
    name: 'Edit Settings',
    description: 'Modify organization profile and settings',
    icon: Settings,
    roles: { admin: true, member: true, viewer: false },
  },
  {
    id: '4',
    name: 'Edit Content',
    description: 'Create and modify organization content',
    icon: FileEdit,
    roles: { admin: true, member: true, viewer: false },
  },
  {
    id: '5',
    name: 'Delete Resources',
    description: 'Remove organization resources permanently',
    icon: Trash2,
    roles: { admin: true, member: false, viewer: false },
  },
  {
    id: '6',
    name: 'Security Settings',
    description: 'Configure security policies and access controls',
    icon: Shield,
    roles: { admin: true, member: false, viewer: false },
  },
];

export function PermissionsTab() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Role Permissions</h3>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="grid grid-cols-[1fr,100px,100px,100px] gap-4 items-center">
            <CardTitle className="text-base font-medium">Permission</CardTitle>
            <span className="text-sm font-medium text-center">Admin</span>
            <span className="text-sm font-medium text-center">Member</span>
            <span className="text-sm font-medium text-center">Viewer</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {permissions.map((permission, index) => {
            const Icon = permission.icon;
            return (
              <div
                key={permission.id}
                className={`grid grid-cols-[1fr,100px,100px,100px] gap-4 items-center p-4 ${
                  index !== permissions.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{permission.name}</p>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Switch checked={permission.roles.admin} />
                </div>
                <div className="flex justify-center">
                  <Switch checked={permission.roles.member} />
                </div>
                <div className="flex justify-center">
                  <Switch checked={permission.roles.viewer} />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
