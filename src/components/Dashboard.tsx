'use client'

import { useState, useEffect } from 'react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { 
  LayoutDashboard, Users, Mail, BarChart2, Settings, Search, 
  Bell, User, ChevronDown, CheckCircle
} from 'lucide-react'
import { 
  mockCreators, mockGrowthData, mockEngagementStats,
  Creator, GrowthDataPoint, EngagementStats, formatNumber
} from '@/lib/data'

export default function Dashboard() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([])
  const [engagementData, setEngagementData] = useState<EngagementStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setCreators(mockCreators)
      setGrowthData(mockGrowthData)
      setEngagementData(mockEngagementStats)
      setIsLoading(false)
      
      // Show demo modal after loading
      setTimeout(() => setShowModal(true), 1000)
    }
    
    fetchData()
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!sidebarCollapsed && <span className="text-xl font-bold">GRIN</span>}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className="flex-1 py-4 px-2 space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active collapsed={sidebarCollapsed} />
          <NavItem icon={<Users size={20} />} label="Recruitment" collapsed={sidebarCollapsed} />
          <NavItem icon={<Mail size={20} />} label="Messages" collapsed={sidebarCollapsed} />
          <NavItem icon={<BarChart2 size={20} />} label="Program" collapsed={sidebarCollapsed} />
          <NavItem icon={<Settings size={20} />} label="Settings" collapsed={sidebarCollapsed} />
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                placeholder="Search..."
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 font-medium text-gray-700">Admin</span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main dashboard */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            
            {/* Brand Growth Chart */}
            <div className="mb-8 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800">Brand Growth</h2>
                  <span className="text-sm text-gray-500">based on 2 social accounts</span>
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
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12, fill: '#6B7280' }} 
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#6B7280' }} 
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toLocaleString()}`, '']}
                          labelFormatter={(label) => `Period: ${label}`}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard 
                    title="Impressions" 
                    value={formatNumber(engagementData.impressions)} 
                    color="bg-blue-500" 
                  />
                  <StatCard 
                    title="Engagements" 
                    value={formatNumber(engagementData.engagements)} 
                    color="bg-green-500" 
                  />
                  <StatCard 
                    title="Likes" 
                    value={formatNumber(engagementData.likes)} 
                    color="bg-purple-500" 
                  />
                  <StatCard 
                    title="Comments" 
                    value={formatNumber(engagementData.comments)} 
                    color="bg-yellow-500" 
                  />
                  <StatCard 
                    title="Shares" 
                    value={formatNumber(engagementData.shares)} 
                    color="bg-red-500" 
                  />
                  <StatCard 
                    title="Views" 
                    value={formatNumber(engagementData.views)} 
                    color="bg-indigo-500" 
                  />
                </div>
              </div>
            )}
            
            {/* Top Creators Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Top TikTok Creators</h2>
              </div>
              
              {isLoading ? (
                <div className="p-4 text-center">Loading creators...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Likes</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Videos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {creators.map((creator) => (
                        <tr key={creator.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                {creator.displayName.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="flex items-center text-sm font-medium text-gray-900">
                                  {creator.displayName}
                                  {creator.verified && (
                                    <CheckCircle className="ml-1 h-4 w-4 text-blue-500" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">@{creator.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {formatNumber(creator.followers)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            {creator.engagement}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            {formatNumber(creator.likes)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
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
      
      {/* Demo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">Watch the Demo</h2>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    className="w-full p-3 rounded border border-gray-600 bg-black text-white"
                    placeholder="First name*"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full p-3 rounded border border-gray-600 bg-black text-white"
                    placeholder="Last name*"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="w-full p-3 rounded border border-gray-600 bg-black text-white"
                    placeholder="Work email*"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    className="w-full p-3 rounded border border-gray-600 bg-black text-white"
                    placeholder="Phone number*"
                  />
                </div>
                <div>
                  <select className="w-full p-3 rounded border border-gray-600 bg-black text-white">
                    <option value="">What best describes you?*</option>
                    <option value="brand">Brand</option>
                    <option value="agency">Agency</option>
                    <option value="influencer">Influencer</option>
                  </select>
                  <p className="text-red-500 text-xs mt-1">Please complete this required field.</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" className="mt-1" />
                  <label htmlFor="consent" className="text-sm">
                    Get emails from GRIN about product updates, industry news, and events. If you 
                    change your mind, you can unsubscribe at any time. View the GRIN privacy policy 
                    for details on how your data is managed.
                  </label>
                </div>
                
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-yellow-300 hover:bg-yellow-400 text-black font-medium rounded"
                  onClick={() => setShowModal(false)}
                >
                  Watch Demo
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper Components
function NavItem({ icon, label, active = false, collapsed }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  collapsed: boolean; 
}) {
  return (
    <a 
      href="#" 
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      {!collapsed && <span className="ml-3">{label}</span>}
    </a>
  )
}

function ChartLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center">
      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  )
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`${color} h-10 w-10 rounded-lg flex items-center justify-center text-white`}>
          <BarChart2 size={20} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}