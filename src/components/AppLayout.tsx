
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex-1 flex flex-col">
      <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-6">
        <SidebarTrigger className="mr-4" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Working Assistant
          </h1>
        </div>
      </header>
      <div className="flex-1 p-6">
        {children}
      </div>
    </main>
  );
}
