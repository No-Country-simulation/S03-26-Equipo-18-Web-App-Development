
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