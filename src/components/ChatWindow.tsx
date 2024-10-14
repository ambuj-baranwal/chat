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
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.sender === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}>
          <div className={`chat-message-content ${message.sender === 'user' ? 'chat-message-user-content' : 'chat-message-bot-content'}`}>
            {message.sender === 'user' ? <User className="w-6 h-6 mr-2 flex-shrink-0" /> : <Bot className="w-6 h-6 mr-2 flex-shrink-0" />}
            <div className="markdown-content">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="chat-loading">
          <div className="chat-loading-content">
            <p>Thinking...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;