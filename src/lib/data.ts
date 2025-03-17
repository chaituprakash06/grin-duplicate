// Types
export interface Creator {
    id: string;
    username: string;
    displayName: string;
    followers: number;
    engagement: number;
    likes: number;
    videoCount: number;
    verified: boolean;
  }
  
  export interface GrowthDataPoint {
    date: string;
    followers: number;
    engagements: number;
    tiktok: number;
  }
  
  export interface EngagementStats {
    impressions: number;
    engagements: number;
    likes: number;
    comments: number;
    shares: number;
    views: number;
  }
  
  // Mock data
  export const mockCreators: Creator[] = [
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
  
  export const mockGrowthData: GrowthDataPoint[] = [
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
  
  export const mockEngagementStats: EngagementStats = {
    impressions: 215680000,
    engagements: 24110000,
    likes: 23670000,
    comments: 157490000,
    shares: 282270000,
    views: 207220000
  };
  
  // Helper function to format large numbers
  export function formatNumber(num: number): string {
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