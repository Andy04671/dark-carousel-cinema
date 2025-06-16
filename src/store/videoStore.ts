
import { create } from 'zustand';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  year: string;
  rating: string;
  duration?: string;
}

interface VideoStore {
  selectedVideo: Video | null;
  isModalOpen: boolean;
  openVideo: (video: Video) => void;
  closeVideo: () => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  selectedVideo: null,
  isModalOpen: false,
  openVideo: (video) => set({ selectedVideo: video, isModalOpen: true }),
  closeVideo: () => set({ selectedVideo: null, isModalOpen: false }),
}));
