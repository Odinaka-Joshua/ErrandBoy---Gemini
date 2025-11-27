import { Errander, ServiceCategory } from './types';

export const ERRANDERS: Errander[] = [
  {
    id: '1',
    name: 'Chidi Okeke',
    specialty: 'Market Runs & Logistics',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 3500,
    location: 'Ifite, Awka',
    verified: true,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    bio: 'Expert at navigating Eke Awka market. I get the best prices for fresh produce.',
    tags: ['Fast', 'Negotiator', 'Bike Owner']
  },
  {
    id: '2',
    name: 'Amaka Obi',
    specialty: 'House Cleaning & Organization',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 4500,
    location: 'Udoka Estate',
    verified: true,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    bio: 'Meticulous cleaner. I specialize in post-party cleanup and executive home organization.',
    tags: ['Detail-oriented', 'Pet Friendly', 'Trusted']
  },
  {
    id: '3',
    name: 'Emmanuel Eze',
    specialty: 'Tech Support & Installations',
    rating: 4.7,
    reviews: 45,
    hourlyRate: 5000,
    location: 'Aroma Junction',
    verified: true,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    bio: 'UNIZIK Comp Sci student. Can fix WiFi, set up smart TVs, and troubleshoot gadgets.',
    tags: ['Tech Savvy', 'English Speaker', 'Student']
  },
  {
    id: '4',
    name: 'Blessing Okafor',
    specialty: 'Laundry & Ironing',
    rating: 4.9,
    reviews: 210,
    hourlyRate: 3000,
    location: 'Okpuno',
    verified: true,
    imageUrl: 'https://picsum.photos/200/200?random=4',
    bio: 'Professional laundry services with pickup and delivery. Your clothes will look brand new.',
    tags: ['Quick Turnaround', 'Delicate Fabrics']
  }
];

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'market',
    title: 'Market Runs',
    icon: 'shopping_basket',
    description: 'We shop so you don’t have to.'
  },
  {
    id: 'cleaning',
    title: 'House Chores',
    icon: 'cleaning_services',
    description: 'Cleaning, laundry, and dishes.'
  },
  {
    id: 'moving',
    title: 'Clearance & Moving',
    icon: 'local_shipping',
    description: 'Pack, move, and settle in.'
  },
  {
    id: 'projects',
    title: 'Project Submission',
    icon: 'school',
    description: 'Print, bind, and submit assignments.'
  },
];
