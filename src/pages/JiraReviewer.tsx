
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ticket, CheckCircle, AlertTriangle, XCircle, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyReviewData = {
  jiraTicket: {
    key: "PROJ-123",
    title: "Implement User Authentication System",
    acceptanceCriteria: [
      "User can login with email/password",
      "JWT tokens are generated",
      "Password reset via email works",
      "Session management is implemented"
    ]
  },
  confluencePage: {
    title: "Authentication API Documentation",
    requirements: [
      "Support OAuth 2.0",
      "Implement rate limiting",
      "Add audit logging",
      "Support multi-factor authentication"
    ]
  },
  analysis: {
    overallScore: 75,
    coverageScore: 80,
    consistencyScore: 70,
    completenessScore: 75,
    gaps: [
      {
        type: "missing_requirement",
        severity: "high",
        description: "OAuth 2.0 support mentioned in Confluence but not in Jira acceptance criteria",
        suggestion: "Add OAuth 2.0 implementation to Jira ticket acceptance criteria"
      },
      {
        type: "incomplete_criteria",
        severity: "medium", 
        description: "Rate limiting requirement from Confluence not addressed in Jira",
        suggestion: "Include API rate limiting in the authentication system requirements"
      }
    ],
    recommendations: [
      "Align Jira acceptance criteria with Confluence requirements",
      "Add technical implementation details to ticket",
      "Consider breaking down into smaller subtasks",
      "Define clear testing criteria"
    ]
  }
};

const JiraReviewer = () => {
  const [jiraInput, setJiraInput] = useState("");
  const [confluenceInput, setConfluenceInput] = useState("");
  const [jiraFile, setJiraFile] = useState<File | null>(null);
  const [confluenceFile, setConfluenceFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<"url" | "upload">("url");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File, type: "jira" | "confluence") => {
    if (type === "jira") {
      setJiraFile(file);
    } else {
      setConfluenceFile(file);
    }
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
        title: "Review Completed",
        description: "Jira task has been reviewed against Confluence documentation.",
      });
    }, 3500);
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
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center">
          <Ticket className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Jira Task Reviewer</h1>
          <p className="text-muted-foreground">Review Jira tasks against Confluence documentation with AI insights</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Method</CardTitle>
          <CardDescription>Choose how to provide Jira and Confluence data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as "url" | "upload")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">URLs</TabsTrigger>
              <TabsTrigger value="upload">File Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jira-url">Jira Ticket URL</Label>
                    <Input
                      id="jira-url"
                      value={jiraInput}
                      onChange={(e) => setJiraInput(e.target.value)}
                      placeholder="https://company.atlassian.net/browse/PROJ-123"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confluence-url">Confluence Page URL</Label>
                    <Input
                      id="confluence-url"
                      value={confluenceInput}
                      onChange={(e) => setConfluenceInput(e.target.value)}
                      placeholder="https://company.atlassian.net/wiki/spaces/DEV/pages/123456789"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Jira Data</CardTitle>
                    <CardDescription>Upload JSON or Markdown file with Jira ticket data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop or click to upload
                        </p>
                        <Input
                          type="file"
                          accept=".json,.md,.markdown"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, "jira");
                          }}
                          className="hidden"
                          id="jira-file"
                        />
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="jira-file" className="cursor-pointer">
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Confluence Data</CardTitle>
                    <CardDescription>Upload JSON or Markdown file with Confluence documentation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop or click to upload
                        </p>
                        <Input
                          type="file"
                          accept=".json,.md,.markdown"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, "confluence");
                          }}
                          className="hidden"
                          id="confluence-file"
                        />
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="confluence-file" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                      {confluenceFile && (
                        <div className="flex items-center gap-2 p-2 bg-muted rounded">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{confluenceFile.name}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleReview} disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing Task Against Documentation..." : "Review Task vs Documentation"}
          </Button>
        </CardContent>
      </Card>

      {reviewData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
              <CardDescription>Analysis of Jira task alignment with Confluence documentation</CardDescription>
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
                    {reviewData.analysis.coverageScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Coverage</div>
                  <Progress value={reviewData.analysis.coverageScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {reviewData.analysis.consistencyScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Consistency</div>
                  <Progress value={reviewData.analysis.consistencyScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {reviewData.analysis.completenessScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Completeness</div>
                  <Progress value={reviewData.analysis.completenessScore} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">{reviewData.jiraTicket.title}</h4>
                  <Badge variant="outline" className="mb-3">{reviewData.jiraTicket.key}</Badge>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Acceptance Criteria</h5>
                    <ul className="text-sm space-y-1">
                      {reviewData.jiraTicket.acceptanceCriteria.map((criteria: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{reviewData.confluencePage.title}</h4>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Requirements</h5>
                    <ul className="text-sm space-y-1">
                      {reviewData.confluencePage.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <FileText className="w-3 h-3 text-blue-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gaps & Issues</CardTitle>
              <CardDescription>Misalignments between Jira task and Confluence documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewData.analysis.gaps.map((gap: any, index: number) => (
                  <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(gap.severity)}`}>
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(gap.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {gap.severity}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {gap.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{gap.description}</p>
                        <div className="text-xs p-2 bg-white/50 rounded border">
                          <strong>Suggestion:</strong> {gap.suggestion}
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
              <CardDescription>Actionable suggestions for improving task-documentation alignment</CardDescription>
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

export default JiraReviewer;
