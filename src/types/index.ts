export interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  pinned?: boolean;
  url?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  email?: string;
}

export type FacilityType = "simple" | "accommodation" | "event";

export interface Room {
  name: string;
  description: string;
  price: string;
  images?: string[];
  inclusions?: string;
  bookingPolicy?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface PricingItem {
  duration: string;
  amount: string | number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  type: FacilityType;
  gallery?: string[];
  createdAt?: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Accommodation specific
  rooms?: Room[];

  // Event specific
  pricing?: PricingItem[];
  bookingPolicy?: string;
  remarks?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
}

export interface Album {
  id: string;
  title: string;
  coverImage: string;
  itemCount: number;
  date: string;
  media: MediaItem[];
  createdAt?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface DocumentItem {
  id?: string;
  name: string;
  category: string;
  year: string;
  size: string;
  date: string;
  url?: string;
}

export type BookingStatus = "pending" | "approved" | "rejected";

export interface BookingInput {
  name: string;
  email: string;
  phone: string;
  facilityId: string;
  facility: string;
  type: string;
  room?: string;
  duration?: string;
  checkIn: Date;
  checkOut: Date;
  message?: string;
}

export interface Booking extends BookingInput {
  id: string;
  status: BookingStatus;
  createdAt?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
