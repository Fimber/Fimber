export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  image?: string;
  status: 'published' | 'draft';
  date: string;
  updatedAt: string;
}

export interface Service {
  num: string;
  iconName: 'edit' | 'search' | 'code' | 'calendar' | 'book-open';
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  client: string;
  title: string;
  metrics: string[];
  link: string;
  date: string;
  featured?: boolean;
}

export interface Experience {
  date: string;
  company: string;
  description: string;
  metric?: string;
  /** e.g. Agency, Scraping — shown on timeline */
  category?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  colorClass: string;
}
