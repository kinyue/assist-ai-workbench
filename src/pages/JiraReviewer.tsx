import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Ticket, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyReviewData = {
  ticket: {
    key: "PROJ-123",
    title: "Implement User Authentication System",
    status: "In Progress"
  },
  confluencePage: {
    title: "Authentication Requirements",
    space: "Technical Documentation"
  },
  analysis: {
    overallScore: 75,
    completeness: 80,
    alignment: 70,
    issues: [
      {
        type: "missing",
        severity: "high",
        category: "Acceptance Criteria",
        description: "Missing requirement for password complexity validation",
        suggestion: "Add acceptance criteria for password strength requirements as specified in the Confluence documentation"
      },
      {
        type: "mismatch",
        severity: "medium", 
        category: "Technical Approach",
        description: "JWT token expiration time differs from documentation",
        suggestion: "Update ticket to use 24-hour token expiration as per security guidelines"
      },
      {
        type: "incomplete",
        severity: "low",
        category: "Testing Requirements",
        description: "No mention of security testing requirements",
        suggestion: "Add acceptance criteria for penetration testing and security validation"
      }
    ],
    recommendations: [
      "Align token expiration settings with security documentation",
      "Add specific testing criteria for authentication flows",
      "Include error handling specifications for failed login attempts",
      "Reference related security documentation in ticket description"
    ]
  }
};

const JiraReviewer = () => {
  const [ticketUrl, setTicketUrl] = useState("https://company.atlassian.net/browse/PROJ-123");
  const [confluenceUrl, setConfluenceUrl] = useState("https://company.atlassian.net/wiki/spaces/TECH/pages/123456/Authentication+Requirements");
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
        title: "Review Completed",
        description: "Jira ticket has been analyzed against Confluence documentation.",
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jira Ticket</CardTitle>
            <CardDescription>Enter the Jira ticket URL to review</CardDescription>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confluence Documentation</CardTitle>
            <CardDescription>Enter the related Confluence page URL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confluence-url">Confluence Page URL</Label>
              <Input
                id="confluence-url"
                value={confluenceUrl}
                onChange={(e) => setConfluenceUrl(e.target.value)}
                placeholder="https://company.atlassian.net/wiki/spaces/..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleReview} disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing Alignment..." : "Review Task Against Documentation"}
          </Button>
        </CardContent>
      </Card>

      {reviewData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
              <CardDescription>
                Analysis of {reviewData.ticket.key} against {reviewData.confluencePage.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {reviewData.analysis.overallScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <Progress value={reviewData.analysis.overallScore} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {reviewData.analysis.completeness}%
                  </div>
                  <div className="text-sm text-muted-foreground">Completeness</div>
                  <Progress value={reviewData.analysis.completeness} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {reviewData.analysis.alignment}%
                  </div>
                  <div className="text-sm text-muted-foreground">Alignment</div>
                  <Progress value={reviewData.analysis.alignment} className="mt-2" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{reviewData.ticket.title}</h4>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{reviewData.ticket.key}</Badge>
                    <Badge variant="secondary">{reviewData.ticket.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Compared against</div>
                  <div className="font-medium">{reviewData.confluencePage.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issues Found</CardTitle>
              <CardDescription>Areas where the ticket doesn't align with documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewData.analysis.issues.map((issue: any, index: number) => (
                  <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{issue.category}</span>
                          <Badge variant="outline" className="text-xs">
                            {issue.severity}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {issue.type}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{issue.description}</p>
                        <div className="text-xs p-2 bg-white/50 rounded border">
                          <strong>Suggestion:</strong> {issue.suggestion}
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
              <CardDescription>Suggestions for improving task alignment</CardDescription>
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
