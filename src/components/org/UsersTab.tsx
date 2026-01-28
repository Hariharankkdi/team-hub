import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, MoreVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Owner' | 'Pending';
  status: 'Active' | 'Inactive';
  lastActive: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Elena Petrova', email: 'elena.p@acme.org', role: 'Member', status: 'Active', lastActive: '5 min ago' },
  { id: '2', name: 'David Kim', email: 'david.k@fishbowl.net', role: 'Admin', status: 'Inactive', lastActive: '1 day ago' },
  { id: '3', name: 'Priya Sharma', email: 'p.sharma@engteam.io', role: 'Member', status: 'Active', lastActive: '30 sec ago' },
  { id: '4', name: 'Kenji Tanaka', email: 'ktanaka@marketing.com', role: 'Member', status: 'Active', lastActive: '1 min ago' },
  { id: '5', name: 'Aisha Ali', email: 'a.ali@backend.net', role: 'Admin', status: 'Active', lastActive: '3 min ago' },
  { id: '6', name: 'Rajesh Patel', email: 'r.patel@frontend.com', role: 'Member', status: 'Inactive', lastActive: '1 hr ago' },
];

type FilterType = 'All' | 'Admin' | 'Member' | 'Pending' | 'Owner';

const filters: FilterType[] = ['All', 'Admin', 'Member', 'Pending', 'Owner'];

export function UsersTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(4);
  const totalUsers = 250;
  const usersPerPage = 6;
  const totalPages = 7;

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'All' || user.role === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const getRoleBadgeStyles = (role: User['role']) => {
    switch (role) {
      case 'Admin':
        return 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/20';
      case 'Member':
        return 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/20';
      case 'Owner':
        return 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/20';
      case 'Pending':
        return 'bg-warning/15 text-warning border-warning/30 hover:bg-warning/20';
    }
  };

  return (
    <div className="p-6">
      {/* Search and Add User Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search uses by name, email, or role.." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-medium text-foreground mr-2">Filter:</span>
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'rounded-full px-4',
              activeFilter === filter 
                ? 'bg-foreground text-background hover:bg-foreground/90' 
                : 'bg-background hover:bg-muted'
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Users Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-medium">User Name</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Role</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Last Active</TableHead>
              <TableHead className="font-medium text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/30">
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUserSelection(user.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn('font-medium', getRoleBadgeStyles(user.role))}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{user.status}</TableCell>
                <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} Of {totalUsers} users
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  className={cn(
                    currentPage === page && 'border border-foreground'
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
