import axios from 'axios';
import { BookRecommendation } from './types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const fetchBookRecommendations = async (query: string): Promise<BookRecommendation[]> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${GOOGLE_BOOKS_API_KEY}`
    );
    
    return response.data.items.slice(0, 5).map((item: any) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
      description: item.volumeInfo.description || 'No description available',
      rating: item.volumeInfo.averageRating || 0,
      coverImage: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Cover',
      purchaseLink: item.volumeInfo.infoLink,
      tags: item.volumeInfo.categories || [],
    }));
  } catch (error) {
    console.error('Error fetching book recommendations:', error);
    return [];
  }
};