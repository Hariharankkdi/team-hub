export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  maxUsers: number;
  tier: 'Starter' | 'Professional' | 'Enterprise';
  contactEmail: string;
  phoneNumber: string;
  domain: string;
  location: string;
  enabled: boolean;
  logo?: string;
}

export type OrgTab = 'profile' | 'users' | 'reports' | 'usage' | 'permissions';
