// types/index.ts


export type TestimonialCardProps = {
  id: string;
  userName: string;
  content: string;
  category: string;
  status: string;
  tags: Tag[];
  rating?: number;
  location?: string | null;
};

export interface UserFromDB {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  organization: string | null;
  adminId: string | null;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    testimonials: number;
  };
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  testimonialTags?: {
    testimonialId: string;
  }[];
};