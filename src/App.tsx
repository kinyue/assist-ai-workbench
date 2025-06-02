
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import PRConverter from "./pages/PRConverter";
import FileReviewer from "./pages/FileReviewer";
import YAMLComparer from "./pages/YAMLComparer";
import ConfluenceConverter from "./pages/ConfluenceConverter";
import JiraConverter from "./pages/JiraConverter";
import JiraReviewer from "./pages/JiraReviewer";
import PRReviewer from "./pages/PRReviewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
            <AppSidebar />
            <AppLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pr-converter" element={<PRConverter />} />
                <Route path="/file-reviewer" element={<FileReviewer />} />
                <Route path="/yaml-comparer" element={<YAMLComparer />} />
                <Route path="/confluence-converter" element={<ConfluenceConverter />} />
                <Route path="/jira-converter" element={<JiraConverter />} />
                <Route path="/jira-reviewer" element={<JiraReviewer />} />
                <Route path="/pr-reviewer" element={<PRReviewer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
