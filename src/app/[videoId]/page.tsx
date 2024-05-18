"use client";
import React from "react";
import Iframe from "./components/Iframe";
import VideoDesc from "./components/about-video";
import Notes from "./components/notes";

export default function page({ params }: { params: { videoId: string } }) {
  
  const videoId = params.videoId;
  const title = localStorage.getItem("title");
  const description = localStorage.getItem("description");

  return (
    <div>
      <h1 className="text-xl font-semibold p-8">Video Player with Notes</h1>
      <div className="px-8 flex flex-col gap-8">
        <Iframe />
        <VideoDesc title={title} description={description} />
        <Notes />
      </div>
    </div>
  );
}
