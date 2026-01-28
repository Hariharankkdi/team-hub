import { useState } from 'react';
import { Organization, OrgTab } from '@/types/organization';
import { mockOrganizations } from '@/data/mockOrganizations';
import { OrgHeader } from '@/components/org/OrgHeader';
import { OrgProfileCard } from '@/components/org/OrgProfileCard';
import { OrgTabs } from '@/components/org/OrgTabs';
import { ProfileTab } from '@/components/org/ProfileTab';
import { UsersTab } from '@/components/org/UsersTab';
import { ReportsTab } from '@/components/org/ReportsTab';
import { UsageTab } from '@/components/org/UsageTab';
import { PermissionsTab } from '@/components/org/PermissionsTab';
import { ChangeOrgDialog } from '@/components/org/ChangeOrgDialog';
import { CreateOrgDialog, CreateOrgFormData } from '@/components/org/CreateOrgDialog';
import { EditProfileDialog } from '@/components/org/EditProfileDialog';
import { toast } from 'sonner';

const Index = () => {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [currentOrg, setCurrentOrg] = useState<Organization>(mockOrganizations[0]);
  const [activeTab, setActiveTab] = useState<OrgTab>('profile');
  const [changeOrgOpen, setChangeOrgOpen] = useState(false);
  const [createOrgOpen, setCreateOrgOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const handleToggleEnabled = (enabled: boolean) => {
    const updated = { ...currentOrg, enabled };
    setCurrentOrg(updated);
    setOrganizations((prev) =>
      prev.map((org) => (org.id === currentOrg.id ? updated : org))
    );
    toast.success(`Organization ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleRefresh = () => {
    toast.success('Organization data refreshed');
  };

  const handleDelete = () => {
    toast.error('Delete functionality - requires confirmation');
  };

  const handleAdd = () => {
    setCreateOrgOpen(true);
  };

  const handleCreateOrg = (data: CreateOrgFormData) => {
    const newOrg: Organization = {
      id: Date.now().toString(),
      ...data,
      maxUsers: 10,
      enabled: true,
      logo: data.name.substring(0, 2).toUpperCase(),
    };
    setOrganizations((prev) => [...prev, newOrg]);
    setCurrentOrg(newOrg);
    toast.success('Organization created successfully');
  };

  const handleEditProfile = (data: Partial<Organization>) => {
    const updated = { ...currentOrg, ...data };
    setCurrentOrg(updated);
    setOrganizations((prev) =>
      prev.map((org) => (org.id === currentOrg.id ? updated : org))
    );
    toast.success('Profile updated successfully');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab organization={currentOrg} onEditProfile={() => setEditProfileOpen(true)} />;
      case 'users':
        return <UsersTab />;
      case 'reports':
        return <ReportsTab />;
      case 'usage':
        return <UsageTab />;
      case 'permissions':
        return <PermissionsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="bg-card rounded-lg shadow-sm">
        <OrgProfileCard
          organization={currentOrg}
          onToggleEnabled={handleToggleEnabled}
          onRefresh={handleRefresh}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />

        <OrgTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {renderTabContent()}
      </div>

      <ChangeOrgDialog
        open={changeOrgOpen}
        onOpenChange={setChangeOrgOpen}
        organizations={organizations}
        currentOrg={currentOrg}
        onSelectOrg={setCurrentOrg}
      />

      <CreateOrgDialog
        open={createOrgOpen}
        onOpenChange={setCreateOrgOpen}
        onCreate={handleCreateOrg}
      />

      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        organization={currentOrg}
        onSave={handleEditProfile}
      />
    </div>
  );
};

export default Index;
