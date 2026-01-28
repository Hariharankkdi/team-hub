import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface RoleCard {
  id: string;
  name: string;
  title: string;
  description: string;
  isFilled: boolean;
}

const roleCards: RoleCard[] = [
  { id: '1', name: 'Owner', title: 'All Permissions', description: 'Full access to all resources', isFilled: true },
  { id: '2', name: 'Admin', title: 'Manage users and settings', description: '4 permissions', isFilled: true },
  { id: '3', name: 'Member', title: 'Standard access', description: '3 permissions', isFilled: true },
  { id: '4', name: 'Viewer', title: 'Read-only access', description: '3 permissions', isFilled: false },
];

interface Permission {
  resource: string;
  action: string;
  isHeader?: boolean;
  owner: boolean;
  admin: boolean;
  member: boolean;
  viewer: boolean;
}

const permissions: Permission[] = [
  { resource: 'Users', action: '', isHeader: true, owner: false, admin: false, member: false, viewer: false },
  { resource: '', action: 'Create', owner: true, admin: true, member: false, viewer: false },
  { resource: '', action: 'Read', owner: true, admin: true, member: true, viewer: true },
  { resource: '', action: 'Update', owner: true, admin: true, member: false, viewer: false },
  { resource: '', action: 'Delete', owner: true, admin: true, member: false, viewer: false },
  { resource: 'Settings', action: '', isHeader: true, owner: false, admin: false, member: false, viewer: false },
  { resource: '', action: 'Read', owner: true, admin: true, member: false, viewer: false },
  { resource: '', action: 'Update', owner: true, admin: true, member: false, viewer: false },
  { resource: 'Reports', action: '', isHeader: true, owner: false, admin: false, member: false, viewer: false },
  { resource: '', action: 'Read', owner: true, admin: false, member: false, viewer: false },
];

export function PermissionsTab() {
  return (
    <div className="p-6">
      {/* Role Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {roleCards.map((role) => (
          <Card key={role.id} className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge 
                  variant={role.isFilled ? 'default' : 'outline'}
                  className={cn(
                    'font-medium',
                    role.isFilled 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background text-foreground border-foreground'
                  )}
                >
                  {role.name}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="font-medium text-foreground mb-1">{role.title}</div>
              <div className="text-sm text-muted-foreground">{role.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permissions Table Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Usage Over Time</h3>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Permissions Matrix Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/10">
              <TableHead className="font-medium text-foreground w-1/3">Resource/Action</TableHead>
              <TableHead className="font-medium text-foreground text-center">Owner</TableHead>
              <TableHead className="font-medium text-foreground text-center">Admin</TableHead>
              <TableHead className="font-medium text-foreground text-center">Member</TableHead>
              <TableHead className="font-medium text-foreground text-center">Viewer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission, index) => (
              <TableRow 
                key={index}
                className={cn(
                  permission.isHeader && 'bg-muted/50'
                )}
              >
                <TableCell className={cn(
                  permission.isHeader ? 'font-semibold text-foreground' : 'text-foreground pl-8'
                )}>
                  {permission.isHeader ? permission.resource : permission.action}
                </TableCell>
                <TableCell className="text-center">
                  {permission.owner && <Check className="h-5 w-5 text-primary mx-auto" />}
                </TableCell>
                <TableCell className="text-center">
                  {permission.admin && <Check className="h-5 w-5 text-primary mx-auto" />}
                </TableCell>
                <TableCell className="text-center">
                  {permission.member && <Check className="h-5 w-5 text-primary mx-auto" />}
                </TableCell>
                <TableCell className="text-center">
                  {permission.viewer && <Check className="h-5 w-5 text-primary mx-auto" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
