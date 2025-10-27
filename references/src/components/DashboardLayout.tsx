import { LayoutDashboard, FolderOpen, FileText, LogOut } from 'lucide-react';
import logoImage from 'figma:asset/49ad560cb46e058b928645a27bcd46f8ec9bf693.png';

type DashboardLayoutProps = {
  children: React.ReactNode;
  currentView: 'dashboard' | 'categories' | 'articles' | 'blog-builder';
  setCurrentView: (view: 'dashboard' | 'categories' | 'articles' | 'blog-builder') => void;
};

export function DashboardLayout({ children, currentView, setCurrentView }: DashboardLayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'articles', label: 'Articles', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Better Teaching Solutions" className="w-8 h-8" />
            <div>
              <div className="text-white">Better Teaching</div>
              <div className="text-[#d4af37] text-sm">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#d4af37] text-black'
                      : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-[#2a2a2a]">
          <button 
            onClick={() => window.location.reload()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
