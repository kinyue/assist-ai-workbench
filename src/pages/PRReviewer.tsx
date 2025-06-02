import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, CheckCircle, AlertTriangle, XCircle, GitPullRequest, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyReviewData = {
  pullRequest: {
    number: 456,
    title: "feat: Implement user authentication endpoints",
    branch: "feature/auth-endpoints",
    author: "dev.smith"
  },
  jiraTickets: [
    { key: "PROJ-123", title: "Implement User Authentication System" },
    { key: "PROJ-124", title: "Add JWT Token Management" }
  ],
  analysis: {
    overallScore: 85,
    requirementCoverage: 90,
    codeQuality: 80,
    testCoverage: 85,
    findings: [
      {
        type: "requirement_gap",
        severity: "medium",
        category: "Missing Feature",
        description: "Password reset functionality not implemented in this PR",
        jiraRef: "PROJ-123",
        suggestion: "The Jira ticket requires password reset capability. Consider adding this endpoint or creating a separate PR."
      },
      {
        type: "extra_feature", 
        severity: "low",
        category: "Scope Expansion",
        description: "Added OAuth integration not mentioned in requirements",
        jiraRef: "PROJ-124",
        suggestion: "OAuth integration is valuable but not in scope. Consider updating Jira ticket or creating separate story."
      },
      {
        type: "implementation_issue",
        severity: "high",
        category: "Security",
        description: "JWT token expiration not configurable as required",
        jiraRef: "PROJ-124",
        suggestion: "Make token expiration configurable via environment variables as specified in acceptance criteria."
      }
    ],
    recommendations: [
      "Update JWT implementation to match security requirements",
      "Add password reset endpoint or create follow-up PR",
      "Update Jira tickets to reflect OAuth addition",
      "Add integration tests for authentication flows",
      "Document new OAuth configuration requirements"
    ],
    coverage: {
      implemented: ["Login endpoint", "Registration", "Token validation", "OAuth integration"],
      missing: ["Password reset", "Account lockout", "Audit logging"],
      extraFeatures: ["OAuth Google", "OAuth GitHub"]
    }
  }
};

const PRReviewer = () => {
  const [prUrl, setPrUrl] = useState("https://github.com/company/repo/pull/456");
  const [jiraInput, setJiraInput] = useState("PROJ-123, PROJ-124");
  const [jiraFile, setJiraFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<"manual" | "upload">("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setJiraFile(file);
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleReview = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReviewData(dummyReviewData);
      setIsLoading(false);
      toast({
        title: "PR Review Completed",
        description: "Pull request has been analyzed against Jira requirements.",
      });
    }, 4000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200";
      case "low": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <XCircle className="w-4 h-4 text-red-500" />;
      case "medium": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "low": return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
          <Github className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">PR vs Jira Reviewer</h1>
          <p className="text-muted-foreground">Review GitHub PRs against Jira requirements with AI guidance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pull Request</CardTitle>
            <CardDescription>Enter the GitHub PR URL to review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pr-url">GitHub PR URL</Label>
              <Input
                id="pr-url"
                value={prUrl}
                onChange={(e) => setPrUrl(e.target.value)}
                placeholder="https://github.com/owner/repo/pull/123"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jira Requirements</CardTitle>
            <CardDescription>Provide Jira ticket data for comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as "manual" | "upload")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Input</TabsTrigger>
                <TabsTrigger value="upload">File Upload</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jira-tickets">Jira Ticket Keys</Label>
                  <Input
                    id="jira-tickets"
                    value={jiraInput}
                    onChange={(e) => setJiraInput(e.target.value)}
                    placeholder="PROJ-123, PROJ-124, PROJ-125"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload JSON or Markdown file with Jira ticket data
                    </p>
                    <Input
                      type="file"
                      accept=".json,.md,.markdown"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="hidden"
                      id="jira-upload"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="jira-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                  {jiraFile && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{jiraFile.name}</span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleReview} disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing PR Against Requirements..." : "Review PR vs Jira Requirements"}
          </Button>
        </CardContent>
      </Card>

      {reviewData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
              <CardDescription>
                Analysis of PR #{reviewData.pullRequest.number} against Jira requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {reviewData.analysis.overallScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Overall Score</div>
                  <Progress value={reviewData.analysis.overallScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {reviewData.analysis.requirementCoverage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Requirements</div>
                  <Progress value={reviewData.analysis.requirementCoverage} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {reviewData.analysis.codeQuality}%
                  </div>
                  <div className="text-xs text-muted-foreground">Code Quality</div>
                  <Progress value={reviewData.analysis.codeQuality} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {reviewData.analysis.testCoverage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Test Coverage</div>
                  <Progress value={reviewData.analysis.testCoverage} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4" />
                    {reviewData.pullRequest.title}
                  </h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">#{reviewData.pullRequest.number}</Badge>
                    <Badge variant="secondary">{reviewData.pullRequest.author}</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Related Jira Tickets</h4>
                  <div className="flex flex-wrap gap-2">
                    {reviewData.jiraTickets.map((ticket: any) => (
                      <Badge key={ticket.key} variant="outline">
                        {ticket.key}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Implemented</CardTitle>
                <CardDescription>Features completed in this PR</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reviewData.analysis.coverage.implemented.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Missing</CardTitle>
                <CardDescription>Required features not implemented</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reviewData.analysis.coverage.missing.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <XCircle className="w-3 h-3 text-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Extra Features</CardTitle>
                <CardDescription>Additional features beyond requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reviewData.analysis.coverage.extraFeatures.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-3 h-3 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Findings</CardTitle>
              <CardDescription>Issues and misalignments found during review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewData.analysis.findings.map((finding: any, index: number) => (
                  <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(finding.severity)}`}>
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(finding.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{finding.category}</span>
                          <Badge variant="outline" className="text-xs">
                            {finding.severity}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {finding.jiraRef}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{finding.description}</p>
                        <div className="text-xs p-2 bg-white/50 rounded border">
                          <strong>Suggestion:</strong> {finding.suggestion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Actionable suggestions for improving the PR</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {reviewData.analysis.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
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

export default PRReviewer;
