import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  size: string;
}

const mockReports: Report[] = [
  { id: '1', name: 'Monthly Usage Report', type: 'Usage', generatedAt: 'Jan 15, 2026', size: '2.4 MB' },
  { id: '2', name: 'User Activity Summary', type: 'Activity', generatedAt: 'Jan 14, 2026', size: '1.8 MB' },
  { id: '3', name: 'Security Audit Log', type: 'Security', generatedAt: 'Jan 10, 2026', size: '5.2 MB' },
  { id: '4', name: 'Billing Summary Q4', type: 'Billing', generatedAt: 'Jan 1, 2026', size: '890 KB' },
];

export function ReportsTab() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Organization Reports</h3>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4">
        {mockReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.generatedAt}
                      </span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
