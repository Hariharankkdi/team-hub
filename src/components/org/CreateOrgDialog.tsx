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
  location: string;
}

export function CreateOrgDialog({ open, onOpenChange, onCreate }: CreateOrgDialogProps) {
  const [formData, setFormData] = useState<CreateOrgFormData>({
    name: '',
    slug: '',
    description: '',
    industry: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    onOpenChange(false);
    setFormData({
      name: '',
      slug: '',
      description: '',
      industry: '',
      location: '',
    });
  };

  const updateField = (field: keyof CreateOrgFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[675px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-10 pt-8 pb-6 border-b border-border">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Create New Organization
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-10 py-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1: Organization Name | Industry */}
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

            {/* Row 2: Slug | Location */}
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

            {/* Row 3: Description (left column only) */}
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

            {/* Empty right column */}
            <div></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-border">
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