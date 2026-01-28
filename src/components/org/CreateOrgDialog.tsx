import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown } from 'lucide-react';

interface CreateOrgDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: CreateOrgFormData) => void;
}

export interface CreateOrgFormData {
  name: string;
  slug: string;
  description: string;
  industry: string;
  tier: 'Starter' | 'Professional' | 'Enterprise';
  contactEmail: string;
  phoneNumber: string;
  domain: string;
  location: string;
}

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Media',
  'Other',
];

const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Austin, TX',
  'Seattle, WA',
  'Boston, MA',
  'Denver, CO',
  'Miami, FL',
  'Other',
];

export function CreateOrgDialog({ open, onOpenChange, onCreate }: CreateOrgDialogProps) {
  const [formData, setFormData] = useState<CreateOrgFormData>({
    name: '',
    slug: '',
    description: '',
    industry: '',
    tier: 'Starter',
    contactEmail: '',
    phoneNumber: '',
    domain: '',
    location: '',
  });
  const [countryCode, setCountryCode] = useState('+1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      ...formData,
      phoneNumber: `${countryCode} ${formData.phoneNumber}`,
    });
    onOpenChange(false);
    setFormData({
      name: '',
      slug: '',
      description: '',
      industry: '',
      tier: 'Starter',
      contactEmail: '',
      phoneNumber: '',
      domain: '',
      location: '',
    });
  };

  const updateField = (field: keyof CreateOrgFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[675px] p-0 gap-0">
        <DialogHeader className="px-6 py-5 border-b">
          <DialogTitle className="text-base font-semibold">Create New Organization</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Organization Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Organization Name"
                className="h-10 border-border"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-[80px] h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+86">+86</SelectItem>
                    <SelectItem value="+81">+81</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => updateField('phoneNumber', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="flex-1 h-10 border-border"
                />
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium text-foreground">
                Slug
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder="organization-slug"
                className="h-10 border-border"
                required
              />
            </div>

            {/* Domain */}
            <div className="space-y-2">
              <Label htmlFor="domain" className="text-sm font-medium text-foreground">
                Domain
              </Label>
              <Input
                id="domain"
                value={formData.domain}
                onChange={(e) => updateField('domain', e.target.value)}
                placeholder="example.com"
                className="h-10 border-border"
              />
            </div>

            {/* Description - Full width */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Brief description of your organization"
                className="min-h-[80px] border-border resize-none"
                rows={3}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-foreground">
                Location
              </Label>
              <Select
                value={formData.location}
                onValueChange={(value) => updateField('location', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium text-foreground">
                Industry
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => updateField('industry', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-sm font-medium text-foreground">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                placeholder="admin@example.com"
                className="h-10 border-border"
              />
            </div>

            {/* Tier */}
            <div className="space-y-2">
              <Label htmlFor="tier" className="text-sm font-medium text-foreground">
                Tier
              </Label>
              <Select
                value={formData.tier}
                onValueChange={(value) => updateField('tier', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Starter">Starter</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Empty space to align with grid */}
            <div></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="px-6 bg-primary hover:bg-primary/90"
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}