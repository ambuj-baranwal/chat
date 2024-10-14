import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-grow overflow-y-auto rounded-lg border bg-card text-card-foreground shadow-sm p-4">
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
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground'
            } rounded-lg p-3 max-w-[75%]`}
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
          <div className="bg-muted text-muted-foreground rounded-lg p-3">
            <p>Thinking...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
