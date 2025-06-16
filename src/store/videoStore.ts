
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
  myList: Video[];
  openVideo: (video: Video) => void;
  closeVideo: () => void;
  addToMyList: (video: Video) => void;
  removeFromMyList: (videoId: string) => void;
  isInMyList: (videoId: string) => boolean;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  selectedVideo: null,
  isModalOpen: false,
  myList: [],
  openVideo: (video) => set({ selectedVideo: video, isModalOpen: true }),
  closeVideo: () => set({ selectedVideo: null, isModalOpen: false }),
  addToMyList: (video) => set((state) => ({ 
    myList: [...state.myList, video] 
  })),
  removeFromMyList: (videoId) => set((state) => ({ 
    myList: state.myList.filter(video => video.id !== videoId) 
  })),
  isInMyList: (videoId) => get().myList.some(video => video.id === videoId),
}));
