import { useState } from 'react';
import { LayoutDashboard, FolderOpen, FileText, LogOut, Menu, X, User, Home } from 'lucide-react';
import logoImage from '../../assets/images/logo-admin.png';

type DashboardLayoutProps = {
  children: React.ReactNode;
  currentView: 'dashboard' | 'categories' | 'articles' | 'blog-builder' | 'author';
  setCurrentView: (view: 'dashboard' | 'categories' | 'articles' | 'blog-builder' | 'author') => void;
  onLogout: () => void;
};

export function DashboardLayout({ children, currentView, setCurrentView, onLogout }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'author', label: 'Author', icon: User },
  ];

  const handleNavClick = (view: 'dashboard' | 'categories' | 'articles' | 'blog-builder' | 'author') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center justify-between px-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-400 hover:text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <img src={logoImage} alt="BTS" className="w-6 h-6" />
          <span className="text-white font-medium">BTS Admin</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Mobile Backdrop - Only visible on mobile when menu is open */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: always visible in flex flow, Mobile: hidden overlay */}
      <div className="w-52 bg-[#1a1a1a] border-r border-[#2a2a2a] flex-col hidden md:flex">
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
                  onClick={() => handleNavClick(item.id as 'dashboard' | 'categories' | 'articles' | 'blog-builder')}
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
        <div className="p-4 border-t border-[#2a2a2a] space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <Home size={20} />
            <span>Landing Page</span>
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Only on mobile as overlay */}
      <div className={`
        md:hidden w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col
        fixed inset-y-0 left-0 z-50
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
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
                  onClick={() => handleNavClick(item.id as 'dashboard' | 'categories' | 'articles' | 'blog-builder')}
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
        <div className="p-4 border-t border-[#2a2a2a] space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <Home size={20} />
            <span>Landing Page</span>
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className={currentView === 'blog-builder' ? 'p-0' : 'p-4 md:p-8 pt-20 md:pt-8'}>
          {children}
        </div>
      </div>
    </div>
  );
}
