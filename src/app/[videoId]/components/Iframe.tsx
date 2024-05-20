import React, { useEffect, useRef, useState } from "react";

const Iframe = ({ videoId, onReady }: any) => {
  const playerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        videoId,
        events: {
          onReady: onReady,
        },
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [videoId, onReady]);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
      <div
        className="relative w-full h-full overflow-hidden shadow-lg rounded-2xl aspect-video"
        id="player"
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-2xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
  );
};

export default Iframe;
