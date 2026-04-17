// types/index.ts
export interface Tag {
  id: string;  
  name: string;
}

export interface TestimonialCardProps {
  id: string; 
  userName: string;
  content: string;
  rating: number;
  location?: string | null;
  category: string;
  status: string;
  tags: Tag[];
  authorCompany?: string | null; }

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