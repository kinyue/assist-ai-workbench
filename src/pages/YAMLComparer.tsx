
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileJson, AlertTriangle, Plus, Minus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyComparisonData = {
  differences: [
    {
      path: "database.host",
      dev: "localhost",
      staging: "staging-db.company.com",
      production: "prod-db.company.com",
      type: "modified"
    },
    {
      path: "api.rate_limit",
      dev: "1000",
      staging: "5000", 
      production: "10000",
      type: "modified"
    },
    {
      path: "logging.level",
      dev: "debug",
      staging: "info",
      production: "error",
      type: "modified"
    },
    {
      path: "features.beta_features",
      dev: "true",
      staging: "true",
      production: null,
      type: "missing"
    }
  ],
  advice: [
    {
      type: "warning",
      message: "Production environment missing beta_features configuration",
      recommendation: "Add explicit beta_features: false in production config"
    },
    {
      type: "info", 
      message: "Database hosts are properly configured for each environment",
      recommendation: "Consider using environment variables for database URLs"
    },
    {
      type: "warning",
      message: "Debug logging enabled in development",
      recommendation: "Ensure debug logs are disabled in production for security"
    }
  ]
};

const YAMLComparer = () => {
  const [devYaml, setDevYaml] = useState(`database:
  host: localhost
  port: 5432
  name: myapp_dev

api:
  rate_limit: 1000
  timeout: 30

logging:
  level: debug
  
features:
  beta_features: true`);

  const [stagingYaml, setStagingYaml] = useState(`database:
  host: staging-db.company.com
  port: 5432
  name: myapp_staging

api:
  rate_limit: 5000
  timeout: 30

logging:
  level: info
  
features:
  beta_features: true`);

  const [prodYaml, setProdYaml] = useState(`database:
  host: prod-db.company.com
  port: 5432
  name: myapp_prod

api:
  rate_limit: 10000
  timeout: 30

logging:
  level: error`);

  const [isLoading, setIsLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const { toast } = useToast();

  const handleCompare = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setComparisonData(dummyComparisonData);
      setIsLoading(false);
      toast({
        title: "YAML Comparison Complete",
        description: "Environment configurations have been analyzed and compared.",
      });
    }, 2500);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "added": return <Plus className="w-4 h-4 text-green-500" />;
      case "removed": return <Minus className="w-4 h-4 text-red-500" />;
      case "modified": return <Edit className="w-4 h-4 text-blue-500" />;
      case "missing": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <Edit className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAdviceIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
          <FileJson className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">YAML Environment Comparer</h1>
          <p className="text-muted-foreground">Compare YAML configurations across environments with AI advice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Development</CardTitle>
            <CardDescription>Development environment configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={devYaml}
              onChange={(e) => setDevYaml(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Paste your development YAML config..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Staging</CardTitle>
            <CardDescription>Staging environment configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={stagingYaml}
              onChange={(e) => setStagingYaml(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Paste your staging YAML config..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Production</CardTitle>
            <CardDescription>Production environment configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prodYaml}
              onChange={(e) => setProdYaml(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Paste your production YAML config..."
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleCompare} disabled={isLoading} className="w-full">
            {isLoading ? "Comparing Configurations..." : "Compare Environments"}
          </Button>
        </CardContent>
      </Card>

      {comparisonData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Differences</CardTitle>
              <CardDescription>Differences found between environment configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparisonData.differences.map((diff: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {getTypeIcon(diff.type)}
                      <span className="font-medium">{diff.path}</span>
                      <Badge variant={diff.type === 'missing' ? 'destructive' : 'outline'}>
                        {diff.type}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Dev:</span>
                        <div className="font-mono bg-muted p-2 rounded mt-1">
                          {diff.dev || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Staging:</span>
                        <div className="font-mono bg-muted p-2 rounded mt-1">
                          {diff.staging || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Production:</span>
                        <div className="font-mono bg-muted p-2 rounded mt-1">
                          {diff.production || 'N/A'}
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
              <CardDescription>Suggestions for improving your configuration management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparisonData.advice.map((advice: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getAdviceIcon(advice.type)}
                    <div className="flex-1">
                      <p className="font-medium mb-1">{advice.message}</p>
                      <p className="text-sm text-muted-foreground">{advice.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default YAMLComparer;
