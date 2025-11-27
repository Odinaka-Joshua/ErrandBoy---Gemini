export interface Errander {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  verified: boolean;
  imageUrl: string;
  bio: string;
  tags: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ImageSize = '1K' | '2K' | '4K';

export interface GeneratedImage {
  url: string;
  prompt: string;
  size: ImageSize;
}