
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EpisodeList from '../components/EpisodeList';
import { seriesData } from '../data/seriesData';

const Series = () => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentSeries] = useState(seriesData[0]); // For demo, using first series

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 px-4 md:px-12">
        {/* Series Header */}
        <div className="relative mb-8">
          <div 
            className="h-96 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${currentSeries.backdrop})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl font-bold mb-4">{currentSeries.title}</h1>
              <p className="text-lg max-w-2xl mb-4">{currentSeries.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-green-400">95% Match</span>
                <span>{currentSeries.year}</span>
                <span className="border border-gray-400 px-2 py-1">{currentSeries.rating}</span>
                <span>{currentSeries.seasons.length} Seasons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Season Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Episodes</h2>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
            >
              {currentSeries.seasons.map((season) => (
                <option key={season.seasonNumber} value={season.seasonNumber}>
                  Season {season.seasonNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Episodes */}
        <EpisodeList 
          episodes={currentSeries.seasons.find(s => s.seasonNumber === selectedSeason)?.episodes || []}
        />
      </div>
    </div>
  );
};

export default Series;
