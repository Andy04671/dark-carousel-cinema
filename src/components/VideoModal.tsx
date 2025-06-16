
import React, { useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Maximize2, SkipBack, SkipForward } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';

interface VideoModalProps {
  video: {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    year: string;
    rating: string;
  };
}

const VideoModal: React.FC<VideoModalProps> = ({ video }) => {
  const { closeVideo } = useVideoStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideo();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [closeVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full max-w-6xl mx-4">
        {/* Close Button */}
        <button
          onClick={closeVideo}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full aspect-video"
            onPlay={() => console.log('Video started playing')}
          />

          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => skipTime(-10)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <SkipBack size={20} />
                </button>
                
                <button
                  onClick={() => skipTime(10)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{video.title}</h2>
          <div className="flex items-center space-x-4 mb-4 text-sm">
            <span className="text-green-400 font-semibold">Match 95%</span>
            <span>{video.year}</span>
            <span className="border border-gray-400 px-2 py-1">{video.rating}</span>
            <span>HD</span>
          </div>
          <p className="text-gray-300 max-w-2xl">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
