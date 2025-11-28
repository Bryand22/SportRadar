export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  isBusinessUser: boolean;
  goals: string[];
  badges: Badge[];
  stats: {
    completedActivities: number;
    totalHours: number;
    avgIntensity: number;
    activeStreak: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

export interface UserStats {
  activitiesCompleted: number;
  totalHours: number;
  averageIntensity: number;
  streak: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: ActivityType;
  location: Location;
  date?: string;
  time?: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  price: number;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  weatherDependent: boolean;
  indoorActivity: boolean;
}

export type ActivityType =
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'yoga'
  | 'fitness'
  | 'walking'
  | 'hiking'
  | 'tennis'
  | 'football'
  | 'basketball'
  | 'other';

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface Weather {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  windSpeed: number;
  humidity: number;
}

export interface AirQuality {
  index: number; // 0-500
  level: 'good' | 'moderate' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
}

export interface BusinessStats {
  employeesRegistered: number;
  activeEmployees: number;
  activitiesCompleted: number;
  averageSatisfaction: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  goal: number;
  unit: 'steps' | 'km' | 'hours' | 'activities';
  startDate: string;
  endDate: string;
  participants: number;
  progress: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  activitiesCompleted: number;
  lastActive: string;
}