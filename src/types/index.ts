export interface Notice {
  id: string;
  title: string;
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

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  createdAt?: any;
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
  createdAt?: any;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: string;
  year: string;
  description?: string;
  url?: string;
}

export type BookingStatus = "pending" | "approved" | "rejected";

export interface BookingInput {
  name: string;
  email: string;
  phone: string;
  facility: string;
  date: Date;
  message?: string;
}

export interface Booking extends BookingInput {
  id: string;
  status: BookingStatus;
  createdAt: Date | any; // allow any for Firestore Timestamp
}
