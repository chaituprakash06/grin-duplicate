'use client'

import { useState, useEffect } from 'react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { 
  LayoutDashboard, Users, Mail, BarChart2 as BarChartIcon, Settings, Search, 
  Bell, User, ChevronDown, CheckCircle
} from 'lucide-react'

// Types
interface Creator {
  id: string;
  username: string;
  displayName: string;
  followers: number;
  engagement: number;
  likes: number;
  videoCount: number;
  verified: boolean;
}

interface GrowthDataPoint {
  date: string;
  followers: number;
  engagements: number;
  tiktok: number;
}

interface EngagementStats {
  impressions: number;
  engagements: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

// Mock data
const mockCreators: Creator[] = [
  {
    id: '1',
    username: 'charlidamelio',
    displayName: 'Charli D\'Amelio',
    followers: 151200000,
    engagement: 8.4,
    likes: 10700000000,
    videoCount: 2134,
    verified: true
  },
  {
    id: '2',
    username: 'khaby.lame',
    displayName: 'Khaby Lame',
    followers: 142500000,
    engagement: 9.2,
    likes: 9800000000,
    videoCount: 1087,
    verified: true
  },
  {
    id: '3',
    username: 'bellapoarch',
    displayName: 'Bella Poarch',
    followers: 92300000,
    engagement: 7.8,
    likes: 6100000000,
    videoCount: 425,
    verified: true
  },
  {
    id: '4',
    username: 'addisonre',
    displayName: 'Addison Rae',
    followers: 88700000,
    engagement: 6.5,
    likes: 5800000000,
    videoCount: 1835,
    verified: true
  },
  {
    id: '5',
    username: 'zachking',
    displayName: 'Zach King',
    followers: 75800000,
    engagement: 12.3,
    likes: 4700000000,
    videoCount: 648,
    verified: true
  }
];

const mockGrowthData: GrowthDataPoint[] = [
  { date: 'Q1 2021', followers: 450000, engagements: 220000, tiktok: 73000 },
  { date: 'Q2 2021', followers: 580000, engagements: 290000, tiktok: 95000 },
  { date: 'Q3 2021', followers: 720000, engagements: 360000, tiktok: 128000 },
  { date: 'Q4 2021', followers: 850000, engagements: 415000, tiktok: 156000 },
  { date: 'Q1 2022', followers: 920000, engagements: 460000, tiktok: 175000 },
  { date: 'Q2 2022', followers: 985000, engagements: 510000, tiktok: 195000 },
  { date: 'Q3 2022', followers: 1050000, engagements: 550000, tiktok: 215000 },
  { date: 'Q4 2022', followers: 1120000, engagements: 590000, tiktok: 228000 },
  { date: 'Q1 2023', followers: 1180000, engagements: 620000, tiktok: 236000 },
  { date: 'Q2 2023', followers: 1210000, engagements: 642000, tiktok: 239000 }
];

const mockEngagementStats: EngagementStats = {
  impressions: 215680000,
  engagements: 24110000,
  likes: 23670000,
  comments: 157490000,
  shares: 282270000,
  views: 207220000
};

// Helper function
function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default function Dashboard() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCreators(mockCreators);
      setGrowthData(mockGrowthData);
      setEngagementData(mockEngagementStats);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="bg-black text-white transition-all duration-300 border-r border-gray-800 z-10">
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          <span className="text-xl font-bold text-white">GRIN</span>
        </div>
        
        <nav className="flex py-4 px-2 space-x-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Users size={20} />} label="Recruitment" />
          <NavItem icon={<Mail size={20} />} label="Messages" />
          <NavItem icon={<BarChartIcon size={20} />} label="Program" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-black border-b border-gray-800 py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500"
                placeholder="Search..."
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 font-medium text-white">Admin</span>
                <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main dashboard */}
        <main className="flex-1 overflow-y-auto p-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-6">Dashboard</h1>
            
            {/* Brand Growth Chart */}
            <div className="mb-8 bg-gray-900 rounded-lg border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">Brand Growth</h2>
                  <span className="text-sm text-gray-400">based on 2 social accounts</span>
                </div>
              </div>
              <div className="p-4">
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="h-80">
                    <div className="flex justify-end space-x-4 mb-4">
                      <ChartLegend color="#4F46E5" label="Followers" />
                      <ChartLegend color="#10B981" label="Engagements" />
                      <ChartLegend color="#F59E0B" label="TikTok" />
                    </div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12, fill: '#9CA3AF' }} 
                          tickLine={false}
                          axisLine={{ stroke: '#333' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#9CA3AF' }} 
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toLocaleString()}`, '']}
                          labelFormatter={(label) => `Period: ${label}`}
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '6px',
                            color: 'white'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="followers" 
                          stroke="#4F46E5" 
                          strokeWidth={2}
                          dot={{ r: 3, strokeWidth: 2 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="engagements" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={{ r: 3, strokeWidth: 2 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="tiktok" 
                          stroke="#F59E0B" 
                          strokeWidth={2}
                          dot={{ r: 3, strokeWidth: 2 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Engagement Stats */}
            {engagementData && !isLoading && (
              <div className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                  <StatBlock 
                    title="Impressions" 
                    value={formatNumber(engagementData.impressions)} 
                  />
                  <StatBlock 
                    title="Engagements" 
                    value={formatNumber(engagementData.engagements)} 
                  />
                  <StatBlock 
                    title="Likes" 
                    value={formatNumber(engagementData.likes)} 
                  />
                  <StatBlock 
                    title="Comments" 
                    value={formatNumber(engagementData.comments)} 
                  />
                  <StatBlock 
                    title="Shares" 
                    value={formatNumber(engagementData.shares)} 
                  />
                  <StatBlock 
                    title="Views" 
                    value={formatNumber(engagementData.views)} 
                  />
                </div>
              </div>
            )}
            
            {/* Top Creators Table */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-medium text-white">Top TikTok Creators</h2>
              </div>
              
              {isLoading ? (
                <div className="p-4 text-center text-gray-400">Loading creators...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Creator</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Followers</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Engagement</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Total Likes</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Videos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {creators.map((creator) => (
                        <tr key={creator.id} className="hover:bg-gray-800">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-700 flex items-center justify-center text-white">
                                {creator.displayName.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="flex items-center text-sm font-medium text-white">
                                  {creator.displayName}
                                  {creator.verified && (
                                    <CheckCircle className="ml-1 h-4 w-4 text-blue-400" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-400">@{creator.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-200">
                            {formatNumber(creator.followers)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-200">
                            {creator.engagement}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-200">
                            {formatNumber(creator.likes)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-200">
                            {formatNumber(creator.videoCount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Helper Components
function NavItem({ icon, label, active = false }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
}) {
  return (
    <a 
      href="#" 
      className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${
        active ? 'text-blue-400' : 'text-gray-400 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span className="mt-1 text-xs">{label}</span>
    </a>
  )
}

function ChartLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center">
      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  )
}

function StatBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-4">
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-xl font-semibold text-white">{value}</p>
        <div className="mt-2 h-1 bg-gray-800">
          <div className="h-1 bg-blue-500 w-1/3"></div>
        </div>
      </div>
    </div>
  )
}