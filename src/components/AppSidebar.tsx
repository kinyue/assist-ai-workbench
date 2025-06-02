
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
      ? "bg-blue-600 text-white font-medium shadow-sm" 
      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors";

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className={`${isCollapsed ? "w-14" : "w-64"} !bg-white !border-r !border-gray-200`}
      style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb' }}
    >
      <div 
        className="p-4 border-b border-gray-200 !bg-white"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-lg !text-gray-900" style={{ color: '#111827' }}>
                Working Assistant
              </h2>
              <p className="text-xs !text-gray-600" style={{ color: '#4b5563' }}>
                Development Tools
              </p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent 
        className="px-2 !bg-white"
        style={{ backgroundColor: '#ffffff' }}
      >
        <SidebarGroup>
          <SidebarGroupLabel 
            className={`${isCollapsed ? "sr-only" : ""} !text-gray-600 font-medium`}
            style={{ color: '#4b5563' }}
          >
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
                      style={currentPath === item.url ? { backgroundColor: '#2563eb', color: '#ffffff' } : { color: '#374151' }}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div 
        className="p-2 border-t border-gray-200 !bg-white"
        style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb' }}
      >
        <SidebarTrigger 
          className="w-full !text-gray-700 hover:!bg-gray-100"
          style={{ color: '#374151' }}
        />
      </div>
    </Sidebar>
  );
}
