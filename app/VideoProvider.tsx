'use client'
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
type VideoContextType = {
  videoState: {
    movieId: string | null;
    currentTime: number;
  };
  setVideoState: Dispatch<SetStateAction<{
      movieId: string | null;
      currentTime: number;
    }>
  >;
};


const VideoContext = createContext<VideoContextType>({
    videoState: { movieId: null, currentTime: 0 },
    setVideoState: () => {},
});
type Props = {
    children?: React.ReactNode;
};
export function useVideoContext() {
  return useContext(VideoContext);
}

export function VideoProvider({ children }: Props) {
  const [videoState, setVideoState] = useState<VideoContextType["videoState"]>({
    movieId: null,
    currentTime: 0,
  });
  return (
    <VideoContext.Provider value={{ videoState, setVideoState }}>
      {children}
    </VideoContext.Provider>
  );
}