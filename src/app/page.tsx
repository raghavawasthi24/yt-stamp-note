import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <div>
      <h1>Video Player with Notes</h1>
      <div className="px-8 flex flex-col gap-8">
        <iframe
          width="100%"
          height="615"
          src="https://www.youtube.com/embed/GmIsmQ0cHxg?si=8yi3yRS_ysyNacGL"
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          // referrerpolicy="strict-origin-when-cross-origin"
          // allowfullscreen={true}
        ></iframe>
        <div className="flex flex-col gap-2 border-b-8">
          <p className="text-lg font-semibold">Video title goes here</p>
          <p>This is the description of the video</p>
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Video title goes here</p>
            <p>This is the description of the video</p>
          </div>

          <div>
            <p>12 May ‘24</p>
            <p>Timestamp: 01 min 30 sec</p>
            <p>This is my first note.</p>

            <div>
              <Button>Delete</Button>
              <Button>Edit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
