import { Button } from '@/components/ui/button';
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci';

export default function Notes() {
  return (
    <div className="grid gap-6 border p-6 rounded-xl">
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">My notes</p>
          <p>
            All your notes at a single place. Click on any note to go to
            specific timestamp in the video.
          </p>
        </div>
        <Button variant="outline" className="font-semibold">
          <CiCirclePlus className="w-5 h-5 mr-2" />
          Add new note
        </Button>
      </div>

      <div className="flex flex-col gap-4 ">
        <div>
          <p>12 May ‘24</p>
          <p>Timestamp: 01 min 30 sec</p>
        </div>
        <p className="border p-3 rounded-r-lg rounded-b-lg">
          This is my first note.
        </p>

        <div className="self-end grid grid-cols-2 gap-2">
          <Button variant="outline">Delete</Button>
          <Button variant="outline">Edit</Button>
        </div>
      </div>
    </div>
  );
}
