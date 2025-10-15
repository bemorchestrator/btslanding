export interface BlogItem {
  id: number;
  image: string;
  title: string;
  author: string;
  client: string;
  date: string;
}

export type BlogData = BlogItem[];
