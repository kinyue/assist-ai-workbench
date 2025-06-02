
import { NavLink, useLocation } from "react-router-dom";
import { 
  GitPullRequest, 
  FileText, 
  FileX, 
  Globe, 
  Ticket, 
  FileJson,
  Github
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: FileText },
  { title: "PR to JSON/MD", url: "/pr-converter", icon: GitPullRequest },
  { title: "File Reviewer", url: "/file-reviewer", icon: FileX },
  { title: "YAML Comparer", url: "/yaml-comparer", icon: FileJson },
  { title: "Confluence to MD", url: "/confluence-converter", icon: Globe },
  { title: "Jira to MD", url: "/jira-converter", icon: Ticket },
  { title: "Jira Reviewer", url: "/jira-reviewer", icon: Ticket },
  { title: "PR Reviewer", url: "/pr-reviewer", icon: Github },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/50 transition-colors";

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-lg">Working Assistant</h2>
              <p className="text-xs text-muted-foreground">Development Tools</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-2 border-t">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}
