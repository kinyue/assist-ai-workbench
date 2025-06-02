import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GitPullRequest, 
  FileText, 
  FileX, 
  Globe, 
  Ticket, 
  FileJson,
  Github,
  ArrowUp
} from "lucide-react";

const modules = [
  {
    id: "pr-converter",
    title: "GitHub PR Converter",
    description: "Convert GitHub Pull Requests to JSON or Markdown format",
    icon: GitPullRequest,
    path: "/pr-converter",
    color: "from-green-500 to-emerald-600",
    features: ["JSON Export", "Markdown Export", "Code Diff Analysis"]
  },
  {
    id: "file-reviewer",
    title: "GitHub File Reviewer",
    description: "Review GitHub files based on custom rules and guidelines",
    icon: FileX,
    path: "/file-reviewer",
    color: "from-blue-500 to-cyan-600",
    features: ["Custom Rules", "Code Quality", "Best Practices"]
  },
  {
    id: "yaml-comparer",
    title: "YAML Environment Comparer",
    description: "Compare YAML configurations across environments with AI advice",
    icon: FileJson,
    path: "/yaml-comparer",
    color: "from-purple-500 to-violet-600",
    features: ["Multi-Environment", "Diff Analysis", "AI Recommendations"]
  },
  {
    id: "confluence-converter",
    title: "Confluence to Markdown",
    description: "Convert Confluence pages to clean Markdown format",
    icon: Globe,
    path: "/confluence-converter",
    color: "from-indigo-500 to-blue-600",
    features: ["Clean Conversion", "Preserve Formatting", "Bulk Export"]
  },
  {
    id: "jira-converter",
    title: "Jira Ticket Converter",
    description: "Convert Jira tickets to structured Markdown documentation",
    icon: Ticket,
    path: "/jira-converter",
    color: "from-orange-500 to-red-600",
    features: ["Ticket Details", "Comments Export", "Attachment Links"]
  },
  {
    id: "jira-reviewer",
    title: "Jira Task Reviewer",
    description: "Review Jira tasks against Confluence documentation with AI insights",
    icon: Ticket,
    path: "/jira-reviewer",
    color: "from-teal-500 to-green-600",
    features: ["Documentation Sync", "Acceptance Criteria", "AI Analysis"]
  },
  {
    id: "pr-reviewer",
    title: "PR vs Jira Reviewer",
    description: "Review GitHub PRs against Jira requirements with AI guidance",
    icon: Github,
    path: "/pr-reviewer",
    color: "from-pink-500 to-rose-600",
    features: ["Requirement Matching", "Code Review", "AI Validation"]
  }
];

const Index = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Working Assistant Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Streamline your development workflow with AI-powered tools for GitHub, Jira, and Confluence integration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link key={module.id} to={module.path} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 border-0 bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </CardTitle>
                  </div>
                  <ArrowUp className="w-4 h-4 text-muted-foreground transform rotate-45 group-hover:text-blue-600 transition-all" />
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {module.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Ready to boost your productivity?</h3>
            <p className="text-muted-foreground">
              Choose any tool above to get started with AI-powered development assistance
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
