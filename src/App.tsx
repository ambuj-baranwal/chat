import React, { useState, useEffect, useRef } from 'react';
import { Book, Send, User } from 'lucide-react';
import ChatWindow from './components/ChatWindow';
import BookCarousel from './components/BookCarousel';
import { Message, BookRecommendation } from './types';
import { sendMessageToGemini, fetchBookRecommendations } from './api';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookRecommendations, setBookRecommendations] = useState<BookRecommendation[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const geminiResponse = await sendMessageToGemini(input);
      const botMessage: Message = { text: geminiResponse, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);

      const recommendations = await fetchBookRecommendations(input);
      setBookRecommendations(recommendations);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { text: 'Sorry, there was an error processing your request.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card text-card-foreground p-4 flex items-center justify-between shadow">
        <div className="flex items-center">
          <Book className="mr-2" />
          <h1 className="text-xl font-bold">Book Recommender</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-muted">
          <User />
        </button>
      </header>
      <main className="flex-grow flex overflow-hidden">
        <div className="flex-grow flex flex-col p-4 overflow-hidden">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <div className="mt-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask for a book recommendation..."
              className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send />
            </button>
          </div>
        </div>
        <aside className="w-1/3 bg-card text-card-foreground p-4 overflow-y-auto shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Book Recommendations</h2>
          <BookCarousel recommendations={bookRecommendations} />
        </aside>
      </main>
      <div ref={chatEndRef} />
    </div>
  );
}

export default App;
