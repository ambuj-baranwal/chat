export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  rating: number;
  coverImage: string;
  purchaseLink: string;
  tags: string[];
}