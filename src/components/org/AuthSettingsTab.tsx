import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SSOProvider {
  id: string;
  name: string;
  type: 'google' | 'azure' | 'okta' | 'custom';
  icon: React.ReactNode;
  isActive: boolean;
  tenantUrl: string;
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
  createdDate: string;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AzureIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#0078D4" d="M13.05 4.24l-6.35 5.85L2 19.9l3.74.02 3.5-6.42 6.45 6.4h6.31L13.05 4.24z"/>
    <path fill="#0078D4" d="M14.28 4.24L9.75 9.5l3.08 5.35L22 19.92l-7.72-15.68z"/>
  </svg>
);

const OktaIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
  </svg>
);

const getProviderIcon = (type: string) => {
  switch (type) {
    case 'google': return <GoogleIcon />;
    case 'azure': return <AzureIcon />;
    case 'okta': return <OktaIcon />;
    default: return <div className="h-5 w-5 rounded bg-muted flex items-center justify-center text-xs font-medium">SSO</div>;
  }
};

const initialProviders: SSOProvider[] = [
  { 
    id: '1', 
    name: 'Google', 
    type: 'google',
    icon: <GoogleIcon />, 
    isActive: true, 
    tenantUrl: 'accounts.google.com',
    clientId: '', 
    clientSecret: '',
    createdDate: '2024-01-15'
  },
  { 
    id: '2', 
    name: 'Azure', 
    type: 'azure',
    icon: <AzureIcon />, 
    isActive: true, 
    tenantUrl: 'login.microsoftonline.com',
    clientId: '', 
    clientSecret: '', 
    tenantId: '',
    createdDate: '2024-02-20'
  },
  { 
    id: '3', 
    name: 'Okta', 
    type: 'okta',
    icon: <OktaIcon />, 
    isActive: false, 
    tenantUrl: 'dev-123456.okta.com',
    clientId: '', 
    clientSecret: '',
    createdDate: '2024-03-10'
  },
];

export function AuthSettingsTab() {
  const [providers, setProviders] = useState<SSOProvider[]>(initialProviders);
  const [searchQuery, setSearchQuery] = useState('');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [configForm, setConfigForm] = useState<{ name: string; type: 'google' | 'azure' | 'okta' | 'custom'; tenantUrl: string; clientId: string; clientSecret: string; tenantId: string }>({ name: '', type: 'google', tenantUrl: '', clientId: '', clientSecret: '', tenantId: '' });

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tenantUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (providerId: string) => {
    setProviders(prev => prev.map(p => 
      p.id === providerId ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleEditClick = (provider: SSOProvider) => {
    setSelectedProvider(provider);
    setConfigForm({
      name: provider.name,
      type: provider.type,
      tenantUrl: provider.tenantUrl,
      clientId: provider.clientId || '',
      clientSecret: provider.clientSecret || '',
      tenantId: provider.tenantId || '',
    });
    setConfigDialogOpen(true);
  };

  const handleDeleteProvider = (providerId: string) => {
    setProviders(prev => prev.filter(p => p.id !== providerId));
  };

  const handleSaveConfig = () => {
    if (!selectedProvider) return;
    
    setProviders(prev => prev.map(p =>
      p.id === selectedProvider.id
        ? { ...p, ...configForm }
        : p
    ));
    setConfigDialogOpen(false);
    setSelectedProvider(null);
  };

  const handleAddSSO = () => {
    setConfigForm({ name: '', type: 'google', tenantUrl: '', clientId: '', clientSecret: '', tenantId: '' });
    setAddDialogOpen(true);
  };

  const handleCreateSSO = () => {
    const ssoType = configForm.type as 'google' | 'azure' | 'okta' | 'custom';
    const newProvider: SSOProvider = {
      id: Date.now().toString(),
      name: configForm.name || `${configForm.type.charAt(0).toUpperCase() + configForm.type.slice(1)} SSO`,
      type: ssoType,
      icon: getProviderIcon(configForm.type),
      isActive: false,
      tenantUrl: configForm.tenantUrl,
      clientId: configForm.clientId,
      clientSecret: configForm.clientSecret,
      tenantId: configForm.tenantId,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setProviders(prev => [...prev, newProvider]);
    setAddDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* SSO Details Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">SSO Details</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Manage your organization's Single Sign-On providers. Add, configure, or remove SSO integrations.
        </p>

        {/* Search and Add Button */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search SSO providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button 
            onClick={handleAddSSO}
            className="bg-[#18181B] hover:bg-[#18181B]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add SSO
          </Button>
        </div>

        {/* SSO Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">SSO Name</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Tenant URL</TableHead>
                  <TableHead className="font-semibold">Created Date</TableHead>
                  <TableHead className="font-semibold w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No SSO providers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getProviderIcon(provider.type)}
                          <span className="font-medium">{provider.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={provider.isActive}
                          onCheckedChange={() => handleToggleStatus(provider.id)}
                        />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {provider.tenantUrl}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(provider.createdDate)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClick(provider)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteProvider(provider.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedProvider && getProviderIcon(selectedProvider.type)}
              Edit {selectedProvider?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">SSO Name</Label>
              <Input
                id="edit-name"
                value={configForm.name}
                onChange={(e) => setConfigForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter SSO name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tenantUrl">Tenant URL</Label>
              <Input
                id="edit-tenantUrl"
                value={configForm.tenantUrl}
                onChange={(e) => setConfigForm(prev => ({ ...prev, tenantUrl: e.target.value }))}
                placeholder="Enter tenant URL"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-clientId">Client ID</Label>
              <Input
                id="edit-clientId"
                value={configForm.clientId}
                onChange={(e) => setConfigForm(prev => ({ ...prev, clientId: e.target.value }))}
                placeholder="Enter client ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-clientSecret">Client Secret</Label>
              <Input
                id="edit-clientSecret"
                type="password"
                value={configForm.clientSecret}
                onChange={(e) => setConfigForm(prev => ({ ...prev, clientSecret: e.target.value }))}
                placeholder="Enter client secret"
              />
            </div>

            {selectedProvider?.type === 'azure' && (
              <div className="space-y-2">
                <Label htmlFor="edit-tenantId">Tenant ID</Label>
                <Input
                  id="edit-tenantId"
                  value={configForm.tenantId}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, tenantId: e.target.value }))}
                  placeholder="Enter tenant ID"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfig} className="bg-[#18181B] hover:bg-[#18181B]/90 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add SSO Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New SSO Provider</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-type">SSO Type</Label>
              <Select
                value={configForm.type}
                onValueChange={(value: 'google' | 'azure' | 'okta' | 'custom') => setConfigForm(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select SSO type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">
                    <div className="flex items-center gap-2">
                      <GoogleIcon />
                      Google
                    </div>
                  </SelectItem>
                  <SelectItem value="azure">
                    <div className="flex items-center gap-2">
                      <AzureIcon />
                      Azure
                    </div>
                  </SelectItem>
                  <SelectItem value="okta">
                    <div className="flex items-center gap-2">
                      <OktaIcon />
                      Okta
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">Custom SAML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-name">SSO Name</Label>
              <Input
                id="add-name"
                value={configForm.name}
                onChange={(e) => setConfigForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter SSO name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-tenantUrl">Tenant URL</Label>
              <Input
                id="add-tenantUrl"
                value={configForm.tenantUrl}
                onChange={(e) => setConfigForm(prev => ({ ...prev, tenantUrl: e.target.value }))}
                placeholder="Enter tenant URL"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="add-clientId">Client ID</Label>
              <Input
                id="add-clientId"
                value={configForm.clientId}
                onChange={(e) => setConfigForm(prev => ({ ...prev, clientId: e.target.value }))}
                placeholder="Enter client ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="add-clientSecret">Client Secret</Label>
              <Input
                id="add-clientSecret"
                type="password"
                value={configForm.clientSecret}
                onChange={(e) => setConfigForm(prev => ({ ...prev, clientSecret: e.target.value }))}
                placeholder="Enter client secret"
              />
            </div>

            {configForm.type === 'azure' && (
              <div className="space-y-2">
                <Label htmlFor="add-tenantId">Tenant ID</Label>
                <Input
                  id="add-tenantId"
                  value={configForm.tenantId}
                  onChange={(e) => setConfigForm(prev => ({ ...prev, tenantId: e.target.value }))}
                  placeholder="Enter tenant ID"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSSO} className="bg-[#18181B] hover:bg-[#18181B]/90 text-white">
              Create SSO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
