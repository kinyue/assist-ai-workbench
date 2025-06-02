
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileX, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyReviewData = {
  file: "src/components/UserProfile.tsx",
  issues: [
    {
      type: "error",
      line: 15,
      message: "Missing error handling for API call",
      rule: "Error Handling",
      severity: "high"
    },
    {
      type: "warning",
      line: 23,
      message: "Consider using useMemo for expensive calculation",
      rule: "Performance",
      severity: "medium"
    },
    {
      type: "info",
      line: 8,
      message: "Add TypeScript interface for props",
      rule: "Type Safety",
      severity: "low"
    }
  ],
  score: 7.5,
  suggestions: [
    "Add proper error boundaries",
    "Implement loading states",
    "Add unit tests coverage"
  ]
};

const FileReviewer = () => {
  const [repoUrl, setRepoUrl] = useState("https://github.com/company/repo");
  const [filePath, setFilePath] = useState("src/components/UserProfile.tsx");
  const [customRules, setCustomRules] = useState(`1. All components must have error handling
2. Use TypeScript interfaces for all props
3. Include loading states for async operations
4. Follow naming conventions (PascalCase for components)
5. Add proper accessibility attributes`);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState<any>(null);
  const { toast } = useToast();

  const handleReview = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReviewData(dummyReviewData);
      setIsLoading(false);
      toast({
        title: "File Review Completed",
        description: "Your file has been reviewed against the custom rules.",
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-orange-600 bg-orange-50";
      case "low": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "error": return <XCircle className="w-4 h-4 text-red-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "info": return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
          <FileX className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">GitHub File Reviewer</h1>
          <p className="text-muted-foreground">Review GitHub files based on custom rules and guidelines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>File Input</CardTitle>
            <CardDescription>Specify the repository and file to review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input
                id="repo-url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-path">File Path</Label>
              <Input
                id="file-path"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                placeholder="src/components/Component.tsx"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Rules</CardTitle>
            <CardDescription>Define your review criteria and guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={customRules}
              onChange={(e) => setCustomRules(e.target.value)}
              placeholder="Enter your custom review rules..."
              className="min-h-[150px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleReview} disabled={isLoading} className="w-full">
            {isLoading ? "Reviewing File..." : "Start Review"}
          </Button>
        </CardContent>
      </Card>

      {reviewData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
              <CardDescription>Overall assessment of {reviewData.file}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">{reviewData.score}/10</div>
                  <div className="text-sm text-muted-foreground">Quality Score</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{reviewData.issues.length} Issues Found</div>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="destructive">{reviewData.issues.filter(i => i.severity === 'high').length} High</Badge>
                    <Badge variant="outline">{reviewData.issues.filter(i => i.severity === 'medium').length} Medium</Badge>
                    <Badge variant="secondary">{reviewData.issues.filter(i => i.severity === 'low').length} Low</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issues Found</CardTitle>
              <CardDescription>Detailed breakdown of code review findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewData.issues.map((issue: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getSeverityIcon(issue.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Line {issue.line}</span>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline">{issue.rule}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
              <CardDescription>Recommendations for improving code quality</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {reviewData.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FileReviewer;
