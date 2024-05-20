"use client";
import React, { useEffect, useRef, useState } from "react";
import VideoDesc from "./components/about-video";
import Notes from "./components/notes";
import Iframe from "./components/Iframe";

// Define the Player interface with the methods we will use
interface Player {
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

// Define the props for the page component
interface PageProps {
  params: {
    videoId: string;
  };
}

declare global {
  interface Window {
    YT: any;
  }
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { videoId } = params;
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const playerRef = useRef<Player | null>(null);

  const title = localStorage.getItem("title");
  const description = localStorage.getItem("description");

 const handleVideoReady = (event:any) => {
   playerRef.current = event.target;
   console.log(playerRef);
 };

  const addNote = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setTimestamp(currentTime);
    }
  };

  const seekTo = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold p-8">Video Player with Notes</h1>
      <div className="px-8 flex flex-col gap-8">
        <Iframe
          videoId={videoId}
          onReady={handleVideoReady}
        />{" "}
        <VideoDesc title={title} description={description} />
        <Notes
          addNote={addNote}
          timestamp={timestamp || 0}
          videoId={videoId}
          seekTo={seekTo}
        />
      </div>
    </div>
  );
};

export default Page;
