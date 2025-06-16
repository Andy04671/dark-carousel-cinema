
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from './VideoCard';
import { mockContent } from '../data/mockContent';

interface ContentCarouselProps {
  title: string;
  category: string;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    // Filter content by category
    const filteredContent = mockContent.filter(item => 
      item.categories.includes(category) || category === 'trending'
    );
    setContent(filteredContent);
  }, [category]);

  const itemsPerPage = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 5;
  const maxIndex = Math.max(0, content.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (content.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 px-4 md:px-0">{title}</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Content Grid */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              width: `${(content.length / itemsPerPage) * 100}%`
            }}
          >
            {content.map((item, index) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 px-1"
                style={{ width: `${100 / content.length}%` }}
              >
                <VideoCard video={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {currentIndex < maxIndex && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentCarousel;
