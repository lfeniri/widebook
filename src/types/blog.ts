export type BlogContentBlock =
  | { type: 'heading'; level: number; children: BlogContentBlock[] }
  | { type: 'paragraph'; children: BlogContentBlock[] }
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'list'; ordered: boolean; children: BlogContentBlock[] }
  | { type: 'listItem'; children: BlogContentBlock[] }
  // Ajoute ici d'autres types de blocs si besoin
  ;

export interface Blog {
  id: string;
  title: string;
  contentConfig?: BlogContentBlock[];
  slug: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDesc?: string;
  authorId: string;
  categoryId: string;
  category?: Category;
  author?: User;
  comments?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  blogs?: Blog[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  blogId: string;
  author?: User;
}
