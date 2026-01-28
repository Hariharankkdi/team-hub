import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Organization } from "@/types/organization";
import { cn } from "@/lib/utils";
import { Search, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChangeOrgDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizations: Organization[];
  currentOrg: Organization;
  onSelectOrg: (org: Organization) => void;
}

const allOrganizations = [
  { id: "1", name: "Katana Admin", logo: "Kt" },
  { id: "2", name: "Globex Corporation", logo: "Kt" },
  { id: "3", name: "Initech", logo: "Kt" },
  { id: "4", name: "Stark Industries", logo: "Kt" },
  { id: "5", name: "Wayne Enterprises", logo: "Kt" },
  { id: "6", name: "Cyberdyne Systems", logo: "Kt" },
  { id: "7", name: "Oscorp", logo: "Kt" },
  { id: "8", name: "Umbrella Corporation", logo: "Kt" },
  { id: "9", name: "Aperture Science", logo: "Kt" },
];

const childOrganizations = [
  "Marketing Group", "Data Analytics", "Global Relations",
  "Finance Division", "Design Team", "Brand Management",
  "HR Department", "QA Department", "Content Creation",
  "Legal Team", "Cloud Services", "Social Media Team",
  "Sales Division", "Mobile Development", "Public Relations",
  "Engineering Team", "Technical Support", "Internal Communications",
  "Research Group", "Innovation Lab", "Board of Directors",
  "Customer Service", "Product Management", "Investor Relations",
  "IT Department", "Training Department", "Executive Office",
  "Security Team", "Partnerships Team", "Advisory Board",
];

export function ChangeOrgDialog({ open, onOpenChange, organizations, currentOrg, onSelectOrg }: ChangeOrgDialogProps) {
  const [parentSearch, setParentSearch] = useState("");
  const [childSearch, setChildSearch] = useState("");
  const [selectedParentOrg, setSelectedParentOrg] = useState<string | null>(null);
  const [selectedChildOrg, setSelectedChildOrg] = useState<string | null>(null);

  const filteredOrgs = allOrganizations.filter((org) => org.name.toLowerCase().includes(parentSearch.toLowerCase()));

  const filteredChildOrgs = childOrganizations.filter((org) =>
    org.toLowerCase().includes(childSearch.toLowerCase()),
  );

  const selectedParent = allOrganizations.find((org) => org.id === selectedParentOrg);

  const handleSave = () => {
    if (selectedChildOrg) {
      // Find the org from organizations prop or create a mock one
      const org = organizations.find((o) => o.name === selectedChildOrg);
      if (org) {
        onSelectOrg(org);
      }
    }
    onOpenChange(false);
  };

  const handleParentClick = (orgId: string) => {
    setSelectedParentOrg(orgId);
    setSelectedChildOrg(null);
    setChildSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg font-semibold">Change Organization</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-[480px]">
          {/* Left Panel - Parent Organizations */}
          <div className="w-72 flex flex-col">
            <div className="p-4">
              <div className="relative border rounded-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Parent Organizations"
                  value={parentSearch}
                  onChange={(e) => setParentSearch(e.target.value)}
                  className="pl-9 border-0"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              {filteredOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleParentClick(org.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-y border-border -mt-px first:mt-0",
                    selectedParentOrg === org.id && "bg-muted/50",
                  )}
                >
                  <div className="w-8 h-8 rounded bg-[#E5F530] text-black flex items-center justify-center font-bold text-xs">
                    {org.logo}
                  </div>
                  <span className="text-sm font-medium">{org.name}</span>
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Vertical Splitter Line */}
          <div className="w-px bg-border" />

          {/* Right Panel - Child Organizations */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
                {selectedParent ? (
                  <>
                    <span className="text-foreground underline">{selectedParent.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">SI_Sales Team</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Select a parent organization</span>
                )}
              </div>
              <div className="relative w-64 border rounded-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Child Organizations"
                  value={childSearch}
                  onChange={(e) => setChildSearch(e.target.value)}
                  className="pl-9 border-0"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="grid grid-cols-3 gap-x-12 gap-y-4">
                {filteredChildOrgs.map((org) => (
                  <button
                    key={org}
                    onClick={() => setSelectedChildOrg(org)}
                    className={cn(
                      "text-left text-sm py-1 transition-colors hover:text-foreground",
                      selectedChildOrg === org ? "font-medium text-foreground" : "text-foreground"
                    )}
                  >
                    {org}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
