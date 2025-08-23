import React from "react";
import { useSentryLogs } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Search,
  MoreHorizontal,
  Clock,
  AlertCircle,
  Info,
} from "lucide-react";

export default function SentryLogsPage() {
  const { data: logsData, isLoading, error } = useSentryLogs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading logs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600">Failed to load Sentry logs</p>
        </div>
      </div>
    );
  }

  const logs = logsData?.data?.data || [];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sentry Logs</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export Logs</Button>
        </div>
      </div>
      <Separator />

      {/* Search and Filters */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-8" />
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {logs.map((log: any) => (
          <Card key={log.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                {getLevelIcon(log.level)}
                <CardTitle className="text-sm font-medium">
                  {log.message}
                </CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getLevelColor(log.level)}>{log.level}</Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                {log.context && Object.keys(log.context).length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Context:</strong> {JSON.stringify(log.context)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {logs.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No logs found</h3>
          <p className="text-muted-foreground mb-4">
            No Sentry logs are available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
