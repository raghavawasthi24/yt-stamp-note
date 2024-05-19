"use client";
import React, { useEffect, useRef, useState } from "react";
import VideoDesc from "./components/about-video";
import Notes from "./components/notes";

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
  const title = localStorage.getItem("title") || "Default Title";
  const description =
    localStorage.getItem("description") || "Default Description";

  const [timestamp, setTimestamp] = useState<number | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const initializePlayer = () => {
     

      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("player", {
          height: "515",
          width: "100%",
          videoId: videoId,
          playerVars: {
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      } else {
        console.error("YouTube IFrame API or Player not available.");
      }
    };

    const onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    if (!window.YT) {
      // Load YouTube IFrame API script
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onload = () => {
        if (window.YT && window.YT.Player) {
          initializePlayer();
        } else {
          console.error("YouTube IFrame API or Player not available.");
        }
      };
      tag.onerror = () => {
        console.error("Failed to load YouTube IFrame API script.");
      };
      document.body.appendChild(tag);
    } else if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      console.error("YouTube IFrame API or Player not available.");
    }

    function onPlayerReady(event: any) {
      // Player is ready
    }

    return () => {
      // Cleanup function to remove YouTube player instance
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

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
        <div id="player"></div>
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
