"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Page() {
  const [time, setTime] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube Player
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "315",
        width: "560",
        videoId: "_mR6bY-ndso",
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    function onPlayerReady(event) {
      // Player is ready
    }

    return () => {
      // Cleanup function to remove YouTube player instance
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(time, true); // Seek to the specified time and play the video
    }
  }, [time]);

  return (
    <div>
      <div id="player"></div>
      <button onClick={() => setTime(50)}>Click me</button>
      <button onClick={() => setTime(500)}>Click</button>
    </div>
  );
}
