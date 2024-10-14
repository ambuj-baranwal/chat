import axios from 'axios';
import { BookRecommendation } from './types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// Initialize an array to hold the conversation history
let conversationHistory: { parts: { text: string }[] }[] = [];

// Function to send a message to the Gemini API with conversation history
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Add the new message to the conversation history
    conversationHistory.push({ parts: [{ text: message }] });

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: conversationHistory,  // Send the history as part of the request payload
      }
    );

    // Assuming the API returns a response with generated text
    const reply = response.data.candidates[0].content.parts[0].text;

    // Add the response to the conversation history (optional if needed for further context)
    conversationHistory.push({ parts: [{ text: reply }] });

    return reply;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Function to fetch book recommendations (unchanged)
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
