import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SSOProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AzureIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <path fill="#0078D4" d="M13.05 4.24l-6.35 5.85L2 19.9l3.74.02 3.5-6.42 6.45 6.4h6.31L13.05 4.24z"/>
    <path fill="#0078D4" d="M14.28 4.24L9.75 9.5l3.08 5.35L22 19.92l-7.72-15.68z"/>
  </svg>
);

const OktaIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
    <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
    <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" stroke="currentColor" strokeWidth="2"/>
    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2"/>
    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" stroke="currentColor" strokeWidth="2"/>
    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const initialProviders: SSOProvider[] = [
  { id: 'google', name: 'Google', icon: <GoogleIcon />, isActive: true, clientId: '', clientSecret: '' },
  { id: 'azure', name: 'Azure', icon: <AzureIcon />, isActive: true, clientId: '', clientSecret: '', tenantId: '' },
  { id: 'okta', name: 'Okta', icon: <OktaIcon />, isActive: false, clientId: '', clientSecret: '' },
];

export function AuthSettingsTab() {
  const [providers, setProviders] = useState<SSOProvider[]>(initialProviders);
  const [draggedProvider, setDraggedProvider] = useState<string | null>(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [configForm, setConfigForm] = useState({ clientId: '', clientSecret: '', tenantId: '' });

  const activeProviders = providers.filter(p => p.isActive);
  const inactiveProviders = providers.filter(p => !p.isActive);

  const handleDragStart = (e: React.DragEvent, providerId: string) => {
    setDraggedProvider(providerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetZone: 'active' | 'inactive') => {
    e.preventDefault();
    if (!draggedProvider) return;

    setProviders(prev => prev.map(p => 
      p.id === draggedProvider 
        ? { ...p, isActive: targetZone === 'active' }
        : p
    ));
    setDraggedProvider(null);
  };

  const handleConfigClick = (provider: SSOProvider) => {
    setSelectedProvider(provider);
    setConfigForm({
      clientId: provider.clientId || '',
      clientSecret: provider.clientSecret || '',
      tenantId: provider.tenantId || '',
    });
    setConfigDialogOpen(true);
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

  const ProviderCard = ({ provider, isDragging }: { provider: SSOProvider; isDragging?: boolean }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, provider.id)}
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-lg cursor-grab active:cursor-grabbing transition-all",
        isDragging && "opacity-50 scale-95"
      )}
    >
      {provider.icon}
      <span className="font-medium text-foreground">{provider.name}</span>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* SSO Details Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">SSO Details</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Drag and drop SSO providers between Active and Non active to enable or disable them for your organization.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* Active Zone */}
          <Card 
            className="border-2 border-dashed border-border min-h-[140px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'active')}
          >
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-4">Active</h4>
              <div className="flex flex-wrap gap-3">
                {activeProviders.map(provider => (
                  <ProviderCard 
                    key={provider.id} 
                    provider={provider} 
                    isDragging={draggedProvider === provider.id}
                  />
                ))}
                {activeProviders.length === 0 && (
                  <p className="text-sm text-muted-foreground">Drop providers here to activate</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Non-Active Zone */}
          <Card 
            className="border-2 border-dashed border-border min-h-[140px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'inactive')}
          >
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-4">Non active</h4>
              <div className="flex flex-wrap gap-3">
                {inactiveProviders.map(provider => (
                  <ProviderCard 
                    key={provider.id} 
                    provider={provider}
                    isDragging={draggedProvider === provider.id}
                  />
                ))}
                {inactiveProviders.length === 0 && (
                  <p className="text-sm text-muted-foreground">Drop providers here to deactivate</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SSO Configuration Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">SSO Configuration</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select an SSO provider to configure. A form will open in a popup to enter credentials.
        </p>

        <div className="flex gap-3">
          {providers.map(provider => (
            <Button
              key={provider.id}
              variant="outline"
              className="flex items-center gap-3 px-4 py-3 h-auto"
              onClick={() => handleConfigClick(provider)}
            >
              {provider.icon}
              <span className="font-medium">{provider.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedProvider?.icon}
              Configure {selectedProvider?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                value={configForm.clientId}
                onChange={(e) => setConfigForm(prev => ({ ...prev, clientId: e.target.value }))}
                placeholder="Enter client ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input
                id="clientSecret"
                type="password"
                value={configForm.clientSecret}
                onChange={(e) => setConfigForm(prev => ({ ...prev, clientSecret: e.target.value }))}
                placeholder="Enter client secret"
              />
            </div>

            {selectedProvider?.id === 'azure' && (
              <div className="space-y-2">
                <Label htmlFor="tenantId">Tenant ID</Label>
                <Input
                  id="tenantId"
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
            <Button onClick={handleSaveConfig}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
