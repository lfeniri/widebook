export interface Blog {
  id: string;
  title: string;
  content?: { html?: string; css?: string; js?: string };
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
