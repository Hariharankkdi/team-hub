import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Plus, Settings, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Report {
  id: string;
  name: string;
  type: 'Activity' | 'Security';
  generated: string;
  size: string;
}

interface ScheduledReport {
  id: string;
  name: string;
  schedule: string;
}

const recentReports: Report[] = [
  { id: '1', name: 'Monthly Activity Report', type: 'Activity', generated: '2024-01-15', size: '2.5 MB' },
  { id: '2', name: 'User Engagement Analysis', type: 'Security', generated: '2024-03-04', size: '1.2 MB' },
  { id: '3', name: 'Resource Utilization Q4', type: 'Activity', generated: '2024-05-17', size: '300 KB' },
  { id: '4', name: 'Security Audit Q2', type: 'Activity', generated: '2024-10-25', size: '890 KB' },
];

const scheduledReports: ScheduledReport[] = [
  { id: '1', name: 'Weekly Activity Summary', schedule: 'Every Monday at 9:00 AM' },
  { id: '2', name: 'Monthly Billing Report', schedule: '1st of every month at 12:00 AM' },
];

export function ReportsTab() {
  const getTypeBadgeStyles = (type: Report['type']) => {
    switch (type) {
      case 'Activity':
        return 'bg-primary/15 text-primary border-primary/30';
      case 'Security':
        return 'bg-yellow-100 text-yellow-700 border-yellow-400';
    }
  };

  return (
    <div className="p-6">
      {/* Recent Reports Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Reports</h3>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Reports Table */}
      <div className="border border-border rounded-lg overflow-hidden mb-10">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-medium">Report Name</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Generated</TableHead>
              <TableHead className="font-medium">Size</TableHead>
              <TableHead className="font-medium text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReports.map((report) => (
              <TableRow key={report.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn('font-medium', getTypeBadgeStyles(report.type))}
                  >
                    {report.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{report.generated}</TableCell>
                <TableCell className="text-foreground">{report.size}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Scheduled Reports Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Reports</h3>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Report
        </Button>
      </div>

      {/* Scheduled Reports List */}
      <div className="border border-border rounded-lg overflow-hidden">
        {scheduledReports.map((report, index) => (
          <div
            key={report.id}
            className={cn(
              'flex items-center justify-between p-4',
              index !== scheduledReports.length - 1 && 'border-b border-border'
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium">{report.name}</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-muted-foreground">{report.schedule}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
