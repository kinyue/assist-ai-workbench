
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyConfluenceData = {
  title: "API Documentation - User Authentication",
  spaceKey: "DEV",
  pageId: "123456789",
  author: "john.doe",
  lastModified: "2024-01-15T10:30:00Z",
  content: `# User Authentication API

## Overview
This document describes the user authentication endpoints and their usage.

## Endpoints

### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

### POST /api/auth/register
Creates a new user account.

## Error Handling
All endpoints return appropriate HTTP status codes and error messages.`,
  attachments: ["auth-flow-diagram.png", "api-schema.json"],
  labels: ["api", "authentication", "security"],
  version: 5
};

const ConfluenceConverter = () => {
  const [confluenceUrl, setConfluenceUrl] = useState("https://company.atlassian.net/wiki/spaces/DEV/pages/123456789");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState<any>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConvertedData(dummyConfluenceData);
      setIsLoading(false);
      toast({
        title: "Confluence Page Converted",
        description: "Page has been converted to both JSON and Markdown formats.",
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
  
  const markdownOutput = convertedData ? `# ${convertedData.title}

**Space:** ${convertedData.spaceKey}  
**Page ID:** ${convertedData.pageId}  
**Author:** ${convertedData.author}  
**Last Modified:** ${new Date(convertedData.lastModified).toLocaleString()}  
**Version:** ${convertedData.version}

## Labels
${convertedData.labels.map((label: string) => `- ${label}`).join('\n')}

## Content

${convertedData.content}

## Attachments
${convertedData.attachments.map((attachment: string) => `- ${attachment}`).join('\n')}

---
*Converted from Confluence on ${new Date().toLocaleString()}*
` : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Confluence to Markdown</h1>
          <p className="text-muted-foreground">Convert Confluence pages to JSON or Markdown format</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter the Confluence page URL to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confluence-url">Confluence Page URL</Label>
              <Input
                id="confluence-url"
                value={confluenceUrl}
                onChange={(e) => setConfluenceUrl(e.target.value)}
                placeholder="https://company.atlassian.net/wiki/spaces/SPACE/pages/123456789"
              />
            </div>
            <Button onClick={handleConvert} disabled={isLoading} className="w-full">
              {isLoading ? "Converting..." : "Convert Page"}
            </Button>
          </CardContent>
        </Card>

        {convertedData && (
          <Card>
            <CardHeader>
              <CardTitle>Page Summary</CardTitle>
              <CardDescription>Overview of the converted Confluence page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{convertedData.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{convertedData.spaceKey}</Badge>
                    <Badge variant="secondary">v{convertedData.version}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Labels:</span> {convertedData.labels.length}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attachments:</span> {convertedData.attachments.length}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Author:</span> {convertedData.author}
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

export default ConfluenceConverter;
