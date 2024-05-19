"use client";
import React, { useEffect, useRef, useState } from "react";
import VideoDesc from "./components/about-video";
import Notes from "./components/notes";

interface Player {
  getCurrentTime: () => any;
}

export default function page({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;
  const title = localStorage.getItem("title");
  const description = localStorage.getItem("description");

  const [time, setTime] = useState(0);
  const [timestamp, setTimestamp] = useState(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Load YouTube IFrame API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube Player
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "515",
        width: "100%",
        videoId: `${videoId}`,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    function onPlayerReady(event: any) {
      // Player is ready
    }

    return () => {
      // Cleanup function to remove YouTube player instance
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  function addNote() {
    console.log("Adding note");
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log(currentTime);
      setTimestamp(currentTime);
    }
  }

   const seekTo = (timee:any) => {
     if (playerRef.current && playerRef.current.seekTo) {
       playerRef.current.seekTo(timee, true); // Seek to the specified time and play the video
     }
   };

  return (
    <div>
      <h1 className="text-xl font-semibold p-8">Video Player with Notes</h1>
      <div className="px-8 flex flex-col gap-8">
        <div id="player"></div>
        <VideoDesc title={title} description={description} />
        <Notes addNote={addNote} timestamp={timestamp} videoId={videoId} seekTo={seekTo}/>
      </div>
    </div>
  );
}
