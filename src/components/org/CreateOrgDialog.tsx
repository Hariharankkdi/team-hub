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
      <DialogContent className="sm:max-w-[675px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-10 pt-7 pb-5 border-b border-border">
          <DialogTitle className="text-base font-semibold text-foreground">
            Create New Organization
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-10 pt-8 pb-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Organization Name
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Organization Name"
                className="h-10 bg-white border-border"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-[72px] h-10 bg-white border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+86">+86</SelectItem>
                    <SelectItem value="+81">+81</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => updateField('phoneNumber', e.target.value)}
                  placeholder="Phone Number"
                  className="flex-1 h-10 bg-white border-border"
                />
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Slug
              </Label>
              <Input
                value={formData.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder="Slug"
                className="h-10 bg-white border-border"
                required
              />
            </div>

            {/* Domain */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Domain
              </Label>
              <Input
                value={formData.domain}
                onChange={(e) => updateField('domain', e.target.value)}
                placeholder="Domain"
                className="h-10 bg-white border-border"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Description"
                className="min-h-[100px] bg-white border-border resize-none"
                rows={4}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Location
              </Label>
              <Select
                value={formData.location}
                onValueChange={(value) => updateField('location', value)}
              >
                <SelectTrigger className="h-10 bg-white border-border">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                  <SelectItem value="New York, NY">New York, NY</SelectItem>
                  <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
                  <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
                  <SelectItem value="Austin, TX">Austin, TX</SelectItem>
                  <SelectItem value="Seattle, WA">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Industry
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => updateField('industry', value)}
              >
                <SelectTrigger className="h-10 bg-white border-border">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Contact Email
              </Label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                placeholder="Contact Email"
                className="h-10 bg-white border-border"
              />
            </div>

            {/* Tier */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Tier
              </Label>
              <Select
                value={formData.tier}
                onValueChange={(value) => updateField('tier', value)}
              >
                <SelectTrigger className="h-10 bg-white border-border">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Starter">Starter</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Empty cell for grid alignment */}
            <div></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-10 pt-5 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6 h-10 border-border"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="px-6 h-10 bg-[#18181B] hover:bg-[#18181B]/90 text-white"
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}