
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Ticket, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyJiraData = {
  key: "PROJ-123",
  summary: "Implement user authentication system",
  description: "Create a comprehensive user authentication system with login, registration, and password reset functionality. The system should use JWT tokens for session management.",
  issueType: "Story",
  status: "In Progress",
  priority: "High",
  assignee: "john.doe",
  reporter: "jane.smith",
  created: "2024-01-10T09:00:00Z",
  updated: "2024-01-15T14:30:00Z",
  labels: ["authentication", "security", "backend"],
  components: ["API", "Security"],
  fixVersions: ["v2.1.0"],
  storyPoints: 8,
  acceptanceCriteria: [
    "User can register with email and password",
    "User can login with valid credentials",
    "JWT tokens are issued upon successful login",
    "Password reset functionality works via email",
    "All endpoints are properly secured"
  ],
  comments: [
    {
      author: "mike.wilson",
      created: "2024-01-12T10:15:00Z",
      body: "Started working on the authentication endpoints. Need clarification on token expiration time."
    },
    {
      author: "jane.smith",
      created: "2024-01-13T16:20:00Z",
      body: "Token expiration should be 24 hours for regular users, 8 hours for admin users."
    }
  ],
  attachments: ["auth-requirements.pdf", "api-design.png"],
  subtasks: [
    { key: "PROJ-124", summary: "Design authentication API endpoints" },
    { key: "PROJ-125", summary: "Implement JWT token generation" },
    { key: "PROJ-126", summary: "Add password hashing" }
  ]
};

const JiraConverter = () => {
  const [jiraUrl, setJiraUrl] = useState("https://company.atlassian.net/browse/PROJ-123");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState<any>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConvertedData(dummyJiraData);
      setIsLoading(false);
      toast({
        title: "Jira Ticket Converted",
        description: "Ticket has been converted to both JSON and Markdown formats.",
      });
    }, 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The content has been copied to your clipboard.",
    });
  };

  const jsonOutput = convertedData ? JSON.stringify(convertedData, null, 2) : "";
  
  const markdownOutput = convertedData ? `# ${convertedData.key}: ${convertedData.summary}

**Type:** ${convertedData.issueType}  
**Status:** ${convertedData.status}  
**Priority:** ${convertedData.priority}  
**Assignee:** ${convertedData.assignee}  
**Reporter:** ${convertedData.reporter}  
**Story Points:** ${convertedData.storyPoints}  

**Created:** ${new Date(convertedData.created).toLocaleString()}  
**Updated:** ${new Date(convertedData.updated).toLocaleString()}

## Description
${convertedData.description}

## Acceptance Criteria
${convertedData.acceptanceCriteria.map((criteria: string, index: number) => `${index + 1}. ${criteria}`).join('\n')}

## Labels
${convertedData.labels.map((label: string) => `- ${label}`).join('\n')}

## Components
${convertedData.components.map((component: string) => `- ${component}`).join('\n')}

## Fix Versions
${convertedData.fixVersions.map((version: string) => `- ${version}`).join('\n')}

## Subtasks
${convertedData.subtasks.map((subtask: any) => `- [${subtask.key}] ${subtask.summary}`).join('\n')}

## Comments
${convertedData.comments.map((comment: any) => `### ${comment.author} - ${new Date(comment.created).toLocaleString()}
${comment.body}
`).join('\n')}

## Attachments
${convertedData.attachments.map((attachment: string) => `- ${attachment}`).join('\n')}

---
*Converted from Jira on ${new Date().toLocaleString()}*
` : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <Ticket className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Jira Ticket Converter</h1>
          <p className="text-muted-foreground">Convert Jira tickets to JSON or Markdown format</p>
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
              <Label htmlFor="jira-url">Jira Ticket URL</Label>
              <Input
                id="jira-url"
                value={jiraUrl}
                onChange={(e) => setJiraUrl(e.target.value)}
                placeholder="https://company.atlassian.net/browse/PROJ-123"
              />
            </div>
            <Button onClick={handleConvert} disabled={isLoading} className="w-full">
              {isLoading ? "Converting..." : "Convert Ticket"}
            </Button>
          </CardContent>
        </Card>

        {convertedData && (
          <Card>
            <CardHeader>
              <CardTitle>Ticket Summary</CardTitle>
              <CardDescription>Overview of the converted Jira ticket</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{convertedData.summary}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{convertedData.key}</Badge>
                    <Badge variant={convertedData.status === 'Done' ? 'default' : 'secondary'}>
                      {convertedData.status}
                    </Badge>
                    <Badge variant={convertedData.priority === 'High' ? 'destructive' : 'outline'}>
                      {convertedData.priority}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span> {convertedData.issueType}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Points:</span> {convertedData.storyPoints}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Assignee:</span> {convertedData.assignee}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subtasks:</span> {convertedData.subtasks.length}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Labels</h5>
                  <div className="flex flex-wrap gap-1">
                    {convertedData.labels.map((label: string) => (
                      <Badge key={label} variant="outline" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {convertedData && (
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Choose your preferred export format</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="markdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="markdown">Markdown Format</TabsTrigger>
                <TabsTrigger value="json">JSON Format</TabsTrigger>
              </TabsList>
              
              <TabsContent value="markdown" className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(markdownOutput)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Markdown
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download MD
                  </Button>
                </div>
                <Textarea
                  value={markdownOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              </TabsContent>
              
              <TabsContent value="json" className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(jsonOutput)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy JSON
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
                <Textarea
                  value={jsonOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JiraConverter;
