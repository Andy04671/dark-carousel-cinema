
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ContentCarousel from '../components/ContentCarousel';
import GoldrakeCard from '../components/GoldrakeCard';
import VideoModal from '../components/VideoModal';
import { useVideoStore } from '../store/videoStore';

const Index = () => {
  const { selectedVideo, isModalOpen } = useVideoStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      
      <div className="px-4 md:px-12 pb-20">
        <GoldrakeCard />
        
        <ContentCarousel 
          title="Trending Now" 
          category="trending"
        />
        <ContentCarousel 
          title="Action Movies" 
          category="action"
        />
        <ContentCarousel 
          title="Animated Series" 
          category="animation"
        />
        <div data-section="mylist">
          <ContentCarousel 
            title="My List" 
            category="mylist"
          />
        </div>
      </div>

      {isModalOpen && selectedVideo && (
        <VideoModal video={selectedVideo} />
      )}
    </div>
  );
};

export default Index;
