import React from 'react';
import { BookRecommendation } from '../types';
import { Star } from 'lucide-react';

interface BookCarouselProps {
  recommendations: BookRecommendation[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ recommendations }) => {
  return (
    <div className="space-y-4">
      {recommendations.map((book, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex">
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="w-24 h-36 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm">{book.rating}</span>
              </div>
              <div className="mt-2">
                {book.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm mt-2 line-clamp-3">{book.description}</p>
          <a
            href={book.purchaseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            Learn More / Purchase
          </a>
        </div>
      ))}
    </div>
  );
};

export default BookCarousel;