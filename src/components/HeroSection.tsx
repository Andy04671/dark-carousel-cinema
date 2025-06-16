
import React from 'react';
import { Play, Info } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';

const HeroSection = () => {
  const { openVideo } = useVideoStore();

  const heroContent = {
    id: 'hero-1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    backdrop: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    year: '2023',
    rating: 'TV-14',
    seasons: 4
  };

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroContent.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-12">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {heroContent.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-4 text-sm">
            <span className="text-green-400 font-semibold">98% Match</span>
            <span>{heroContent.year}</span>
            <span className="border border-gray-400 px-2 py-1 text-xs">
              {heroContent.rating}
            </span>
            <span>{heroContent.seasons} Seasons</span>
          </div>

          <p className="text-lg mb-8 leading-relaxed">
            {heroContent.description}
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => openVideo(heroContent)}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play size={20} fill="currentColor" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-600/80 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-colors">
              <Info size={20} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
