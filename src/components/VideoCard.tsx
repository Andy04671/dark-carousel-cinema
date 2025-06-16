
import React, { useState } from 'react';
import { Play, Plus, Check, ThumbsUp, ChevronDown } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    year: string;
    rating: string;
    description: string;
    videoUrl: string;
    duration?: string;
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { openVideo, addToMyList, removeFromMyList, isInMyList } = useVideoStore();
  
  const inMyList = isInMyList(video.id);

  const handleAddToList = () => {
    if (inMyList) {
      removeFromMyList(video.id);
    } else {
      addToMyList(video);
    }
  };

  return (
    <div 
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <div className="p-4 w-full">
              <h3 className="font-bold text-lg mb-1">{video.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-300 mb-3">
                <span>{video.year}</span>
                <span className="border border-gray-400 px-1 text-xs">{video.rating}</span>
                {video.duration && <span>{video.duration}</span>}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openVideo(video)}
                  className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Play size={16} fill="currentColor" />
                </button>
                
                <button 
                  onClick={handleAddToList}
                  className={`flex items-center justify-center w-8 h-8 border-2 rounded-full transition-colors ${
                    inMyList 
                      ? 'border-green-400 text-green-400 hover:border-green-300 hover:text-green-300' 
                      : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {inMyList ? <Check size={16} /> : <Plus size={16} />}
                </button>
                
                <button className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full hover:border-white hover:text-white transition-colors">
                  <ThumbsUp size={16} />
                </button>
                
                <button className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full hover:border-white hover:text-white transition-colors ml-auto">
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
