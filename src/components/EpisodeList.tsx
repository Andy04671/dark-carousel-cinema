
import React from 'react';
import { Play, Clock } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  episodeNumber: number;
}

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  const { openVideo } = useVideoStore();

  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="flex bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => openVideo({
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            videoUrl: episode.videoUrl,
            description: episode.description,
            year: '2023',
            rating: 'TV-14'
          })}
        >
          {/* Episode Thumbnail */}
          <div className="relative w-48 h-28 flex-shrink-0">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
              <Play size={32} fill="white" />
            </div>
            <div className="absolute top-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
              {episode.episodeNumber}
            </div>
          </div>

          {/* Episode Info */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{episode.title}</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock size={16} className="mr-1" />
                {episode.duration}
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {episode.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
