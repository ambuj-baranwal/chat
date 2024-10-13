import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat window when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto bg-white rounded-lg shadow p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          } mb-4`}
        >
          <div
            className={`flex items-start ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } rounded-lg p-3 max-w-[75%] shadow-md`}
          >
            {message.sender === 'user' ? (
              <User className="w-6 h-6 mr-2 flex-shrink-0" />
            ) : (
              <Bot className="w-6 h-6 mr-2 flex-shrink-0" />
            )}
            <div className="markdown-content">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-200 text-gray-800 rounded-lg p-3 shadow-md">
            <p>Thinking...</p>
          </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
