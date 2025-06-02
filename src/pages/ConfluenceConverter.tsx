
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Confluence, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyMarkdown = `# API Documentation

## Overview
This document provides comprehensive information about our REST API endpoints.

## Authentication
All API requests require authentication using Bearer tokens:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/v1/users
\`\`\`

## Endpoints

### GET /users
Retrieve a list of all users.

**Parameters:**
- \`limit\` (optional): Number of users to return (default: 20)
- \`offset\` (optional): Number of users to skip (default: 0)

**Response:**
\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 150
}
\`\`\`

### POST /users
Create a new user.

**Request Body:**
\`\`\`json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "admin"
}
\`\`\`

## Error Handling
The API uses standard HTTP status codes:

- \`200\` - Success
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`500\` - Internal Server Error

## Rate Limiting
API requests are limited to 1000 requests per hour per API key.`;

const ConfluenceConverter = () => {
  const [pageUrl, setPageUrl] = useState("https://company.atlassian.net/wiki/spaces/DEV/pages/123456789/API+Documentation");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedMarkdown, setConvertedMarkdown] = useState("");
  const [pageInfo, setPageInfo] = useState<any>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConvertedMarkdown(dummyMarkdown);
      setPageInfo({
        title: "API Documentation",
        space: "Development",
        author: "john.doe@company.com",
        lastModified: "2024-01-15",
        version: 5
      });
      setIsLoading(false);
      toast({
        title: "Page Converted Successfully",
        description: "Confluence page has been converted to Markdown format.",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
          <Confluence className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Confluence to Markdown</h1>
          <p className="text-muted-foreground">Convert Confluence pages to clean Markdown format</p>
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
              <Label htmlFor="page-url">Confluence Page URL</Label>
              <Input
                id="page-url"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder="https://company.atlassian.net/wiki/spaces/..."
              />
            </div>
            <Button onClick={handleConvert} disabled={isLoading} className="w-full">
              {isLoading ? "Converting..." : "Convert to Markdown"}
            </Button>
          </CardContent>
        </Card>

        {pageInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Page Information</CardTitle>
              <CardDescription>Details about the converted page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">{pageInfo.title}</h4>
                <Badge variant="outline" className="mt-1">{pageInfo.space}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Author:</span>
                  <div>{pageInfo.author}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Version:</span>
                  <div>{pageInfo.version}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Modified:</span>
                  <div>{pageInfo.lastModified}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary">Published</Badge>
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
            <CardDescription>Clean Markdown output from the Confluence page</CardDescription>
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

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Preserves formatting and structure</li>
            <li>• Converts tables, code blocks, and links</li>
            <li>• Maintains document hierarchy</li>
            <li>• Supports bulk conversion</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfluenceConverter;
