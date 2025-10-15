import { FolderOpen, FileText, CheckCircle } from 'lucide-react';

type DashboardOverviewProps = {
  categoriesCount: number;
  articlesCount: number;
  publishedCount: number;
};

export function DashboardOverview({ categoriesCount, articlesCount, publishedCount }: DashboardOverviewProps) {
  const stats = [
    {
      label: 'Total Categories',
      value: categoriesCount,
      icon: FolderOpen,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Articles',
      value: articlesCount,
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      label: 'Published Articles',
      value: publishedCount,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
  ];

  return (
    <div>
      <h1 className="text-white text-3xl mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-white text-3xl">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
        <h2 className="text-white text-xl mb-4">Welcome to Better Teaching Solutions Admin</h2>
        <p className="text-gray-400">
          Manage your categories and articles from this dashboard. Use the sidebar navigation to access different sections.
        </p>
      </div>
    </div>
  );
}
