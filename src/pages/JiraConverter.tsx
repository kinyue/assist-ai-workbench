
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Jira, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyMarkdown = `# [PROJ-123] Implement User Authentication System

**Type:** Story  
**Priority:** High  
**Status:** In Progress  
**Assignee:** john.doe@company.com  
**Reporter:** jane.smith@company.com  
**Created:** 2024-01-10  
**Updated:** 2024-01-15  

## Description
Implement a comprehensive user authentication system with secure login, registration, and password management features.

## Acceptance Criteria
- [ ] User can register with email and password
- [ ] User can login with valid credentials
- [ ] User can reset password via email
- [ ] Session management with JWT tokens
- [ ] Input validation and error handling
- [x] API endpoints for authentication

## Story Points
**Estimate:** 13 points

## Components
- Backend API development
- Frontend login/register forms
- Email service integration
- Security implementation

## Comments

### John Doe - 2024-01-12
Started working on the backend API endpoints. Authentication service is 60% complete.

### Jane Smith - 2024-01-13
Please ensure we follow OWASP guidelines for password security.

### John Doe - 2024-01-15
API endpoints completed. Moving to frontend integration next.

## Attachments
- [Authentication Flow Diagram](https://company.atlassian.net/secure/attachment/10001/auth-flow.png)
- [Security Requirements](https://company.atlassian.net/secure/attachment/10002/security-req.pdf)

## Linked Issues
- **Blocks:** PROJ-124 - User Profile Management
- **Related:** PROJ-115 - Password Policy Implementation

## Labels
\`authentication\`, \`security\`, \`backend\`, \`frontend\``;

const JiraConverter = () => {
  const [ticketUrl, setTicketUrl] = useState("https://company.atlassian.net/browse/PROJ-123");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedMarkdown, setConvertedMarkdown] = useState("");
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConvertedMarkdown(dummyMarkdown);
      setTicketInfo({
        key: "PROJ-123",
        title: "Implement User Authentication System",
        type: "Story",
        status: "In Progress",
        priority: "High",
        assignee: "john.doe@company.com",
        storyPoints: 13,
        comments: 3
      });
      setIsLoading(false);
      toast({
        title: "Ticket Converted Successfully",
        description: "Jira ticket has been converted to Markdown format.",
      });
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedMarkdown);
    toast({
      title: "Copied to Clipboard",
      description: "The Markdown content has been copied to your clipboard.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress": return "bg-blue-100 text-blue-800";
      case "done": return "bg-green-100 text-green-800";
      case "to do": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <Jira className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Jira Ticket Converter</h1>
          <p className="text-muted-foreground">Convert Jira tickets to structured Markdown documentation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter the Jira ticket URL to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket-url">Jira Ticket URL</Label>
              <Input
                id="ticket-url"
                value={ticketUrl}
                onChange={(e) => setTicketUrl(e.target.value)}
                placeholder="https://company.atlassian.net/browse/PROJ-123"
              />
            </div>
            <Button onClick={handleConvert} disabled={isLoading} className="w-full">
              {isLoading ? "Converting..." : "Convert to Markdown"}
            </Button>
          </CardContent>
        </Card>

        {ticketInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Ticket Summary</CardTitle>
              <CardDescription>Overview of the converted ticket</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">{ticketInfo.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{ticketInfo.key}</Badge>
                  <Badge className={getStatusColor(ticketInfo.status)}>
                    {ticketInfo.status}
                  </Badge>
                  <Badge className={getPriorityColor(ticketInfo.priority)}>
                    {ticketInfo.priority}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <div>{ticketInfo.type}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Story Points:</span>
                  <div>{ticketInfo.storyPoints}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Assignee:</span>
                  <div className="truncate">{ticketInfo.assignee}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Comments:</span>
                  <div>{ticketInfo.comments}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {convertedMarkdown && (
        <Card>
          <CardHeader>
            <CardTitle>Converted Markdown</CardTitle>
            <CardDescription>Structured Markdown output from the Jira ticket</CardDescription>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Markdown
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download MD
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={convertedMarkdown}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Included Data</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ticket details and metadata</li>
            <li>• Description and acceptance criteria</li>
            <li>• Comments and activity history</li>
            <li>• Attachments and linked issues</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default JiraConverter;
