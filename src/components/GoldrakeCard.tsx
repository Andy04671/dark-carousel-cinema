
import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import { goldrakeData } from '../data/goldrakeData';

const GoldrakeCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const { openVideo } = useVideoStore();

  const currentSeason = goldrakeData.seasons.find(s => s.seasonNumber === selectedSeason);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 px-4 md:px-0">Serie Speciale</h2>
      
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {/* Card Header */}
        <div 
          className="relative h-64 bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${goldrakeData.backdrop})` }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-3xl font-bold mb-2">{goldrakeData.title}</h3>
            <p className="text-gray-300 mb-4 max-w-2xl">{goldrakeData.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span>{goldrakeData.year}</span>
              <span className="border border-gray-400 px-2 py-1">{goldrakeData.rating}</span>
              <span>{goldrakeData.seasons.length} Stagioni</span>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            {isExpanded ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
          </div>
        </div>

        {/* Expandable Episodes Section */}
        {isExpanded && (
          <div className="p-6">
            {/* Season Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <h4 className="text-xl font-semibold">Episodi</h4>
              <div className="flex space-x-2">
                {goldrakeData.seasons.map((season) => (
                  <button
                    key={season.seasonNumber}
                    onClick={() => setSelectedSeason(season.seasonNumber)}
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedSeason === season.seasonNumber
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Stagione {season.seasonNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Episodes List */}
            <div className="space-y-4">
              {currentSeason?.episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => openVideo({
                    id: episode.id,
                    title: episode.title,
                    thumbnail: episode.thumbnail,
                    videoUrl: episode.videoUrl,
                    description: episode.description,
                    year: goldrakeData.year,
                    rating: goldrakeData.rating
                  })}
                >
                  {/* Episode Thumbnail */}
                  <div className="relative w-40 h-24 flex-shrink-0">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                      <Play size={24} fill="white" />
                    </div>
                    <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                      {episode.episodeNumber}
                    </div>
                  </div>

                  {/* Episode Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold">{episode.title}</h5>
                      <span className="text-gray-400 text-sm">{episode.duration}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{episode.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoldrakeCard;
