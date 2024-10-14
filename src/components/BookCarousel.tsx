import React from 'react';
import { BookRecommendation } from '../types';
import { Star } from 'lucide-react';

interface BookCarouselProps {
  recommendations: BookRecommendation[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ recommendations }) => {
  return (
    <div className="book-carousel">
      {recommendations.map((book, index) => (
        <div key={index} className="book-item">
          <div className="flex">
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="w-24 h-36 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="book-item-title">{book.title}</h3>
              <p className="book-item-author">by {book.author}</p>
              <div className="book-item-rating">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm">{book.rating}</span>
              </div>
              <div className="mt-2">
                {book.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="book-item-tags">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="book-item-description">{book.description}</p>
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