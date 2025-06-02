
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GitPullRequest, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyPRData = {
  title: "feat: Add user authentication system",
  number: 123,
  author: "john.doe",
  branch: "feature/auth-system",
  status: "open",
  files: [
    {
      name: "src/auth/login.ts",
      additions: 45,
      deletions: 2,
      diff: `@@ -1,10 +1,15 @@
import { User } from '../types/user';
+import { validatePassword } from '../utils/validation';

export class AuthService {
+  private static instance: AuthService;
+
+  public static getInstance(): AuthService {
+    if (!AuthService.instance) {
+      AuthService.instance = new AuthService();
+    }
+    return AuthService.instance;
+  }
+
-  async login(email: string, password: string): Promise<User> {
+  async login(email: string, password: string): Promise<User | null> {
+    if (!validatePassword(password)) {
+      throw new Error('Invalid password format');
+    }
     // Login implementation
   }
}`
    },
    {
      name: "src/auth/middleware.ts", 
      additions: 32,
      deletions: 0,
      diff: `@@ -0,0 +1,32 @@
+import { Request, Response, NextFunction } from 'express';
+import { AuthService } from './login';
+
+export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
+  try {
+    const token = req.headers.authorization?.split(' ')[1];
+    if (!token) {
+      return res.status(401).json({ error: 'No token provided' });
+    }
+
+    const authService = AuthService.getInstance();
+    const user = await authService.validateToken(token);
+    
+    if (!user) {
+      return res.status(401).json({ error: 'Invalid token' });
+    }
+
+    req.user = user;
+    next();
+  } catch (error) {
+    return res.status(401).json({ error: 'Authentication failed' });
+  }
+};`
    }
  ],
  commits: 5,
  additions: 245,
  deletions: 12,
  description: "This PR implements a comprehensive user authentication system with JWT tokens, password hashing, and middleware protection.",
  reviewers: ["jane.smith", "mike.wilson"]
};

const PRConverter = () => {
  const [prUrl, setPrUrl] = useState("https://github.com/company/repo/pull/123");
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState<any>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConvertedData(dummyPRData);
      setIsLoading(false);
      toast({
        title: "PR Converted Successfully",
        description: "Pull request data has been converted and is ready for export.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The content has been copied to your clipboard.",
    });
  };

  const jsonOutput = convertedData ? JSON.stringify(convertedData, null, 2) : "";
  
  const markdownOutput = convertedData ? `# Pull Request #${convertedData.number}: ${convertedData.title}

**Author:** ${convertedData.author}  
**Branch:** ${convertedData.branch}  
**Status:** ${convertedData.status}  

## Description
${convertedData.description}

## Changes
- **Files Changed:** ${convertedData.files.length}
- **Commits:** ${convertedData.commits}
- **Additions:** +${convertedData.additions}
- **Deletions:** -${convertedData.deletions}

## Files Modified
${convertedData.files.map(file => `### ${file.name}
**Changes:** +${file.additions} -${file.deletions}

\`\`\`diff
${file.diff}
\`\`\`
`).join('\n')}

## Reviewers
${convertedData.reviewers.map(reviewer => `- @${reviewer}`).join('\n')}
` : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <GitPullRequest className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">GitHub PR Converter</h1>
          <p className="text-muted-foreground">Convert GitHub Pull Requests to JSON or Markdown format</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter the GitHub PR URL to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pr-url">Pull Request URL</Label>
              <Input
                id="pr-url"
                value={prUrl}
                onChange={(e) => setPrUrl(e.target.value)}
                placeholder="https://github.com/owner/repo/pull/123"
              />
            </div>
            <Button onClick={handleConvert} disabled={isLoading} className="w-full">
              {isLoading ? "Converting..." : "Convert PR"}
            </Button>
          </CardContent>
        </Card>

        {convertedData && (
          <Card>
            <CardHeader>
              <CardTitle>PR Summary</CardTitle>
              <CardDescription>Overview of the converted pull request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{convertedData.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">#{convertedData.number}</Badge>
                    <Badge variant={convertedData.status === 'open' ? 'default' : 'secondary'}>
                      {convertedData.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Files:</span> {convertedData.files.length}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Commits:</span> {convertedData.commits}
                  </div>
                  <div>
                    <span className="text-green-600">+{convertedData.additions}</span>
                  </div>
                  <div>
                    <span className="text-red-600">-{convertedData.deletions}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {convertedData && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>File Changes</CardTitle>
              <CardDescription>Detailed diff for each modified file</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {convertedData.files.map((file: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-green-600">+{file.additions}</Badge>
                        <Badge variant="outline" className="text-red-600">-{file.deletions}</Badge>
                      </div>
                    </div>
                    <Textarea
                      value={file.diff}
                      readOnly
                      className="font-mono text-xs min-h-[200px]"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Choose your preferred export format</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="json" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="json">JSON Format</TabsTrigger>
                  <TabsTrigger value="markdown">Markdown Format</TabsTrigger>
                </TabsList>
                
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
                    className="min-h-[300px] font-mono text-sm"
                  />
                </TabsContent>
                
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
                    className="min-h-[300px] font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default PRConverter;
