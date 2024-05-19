import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/services/formatDate";
import React, { useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import NotesCard from "./notes-card";
import { nanoid } from "nanoid";

export default function Notes({ addNote, timestamp, videoId, seekTo }: any) {
  const [editing, setEditing] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [formattedTimestamp, setFormattedTimestamp] = React.useState("00:00");
  const [videoNotes, setVideoNotes] = React.useState<any>(() => {
    const storedNotes = localStorage.getItem(videoId);
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [currentDay, setCurrentDay] = React.useState<string>("");

  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")} min ${String(
      remainingSeconds
    ).padStart(2, "0")} sec`;
  };

  function saveNote(id?: string, notes?: string) {
    videoNotes.forEach((note: any) => {
      if (note.nano === id) {
        note.notes = notes;
        localStorage.setItem(videoId, JSON.stringify(videoNotes));
        setEditing(false);
        setNotes("");
      }
    });
    if (!id) {
      const nano = nanoid();
      videoNotes?.push({ nano, notes, timestamp, currentDay });
      localStorage.setItem(videoId, JSON.stringify(videoNotes));
      setEditing(false);
      setNotes("");
    }
  }

  function deleteNote(id: string) {
    const newNotes = videoNotes.filter((note: any) => note.nano !== id);
    localStorage.setItem(videoId, JSON.stringify(newNotes));
    setVideoNotes(newNotes);
  }

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
        <Button
          variant="outline"
          className="font-semibold"
          onClick={() => {
            formatTimestamp(timestamp),
              setCurrentDay(formatDate(new Date())),
              addNote(),
              setEditing(true);
          }}
        >
          <CiCirclePlus className="w-5 h-5 mr-2" />
          Add new note
        </Button>
      </div>

      {editing ? (
        <div className="flex flex-col gap-4">
          <div>
            <p>{formatDate(new Date())}</p>
            <p>
              Timestamp :{" "}
              <span className="text-purple-700">
                {formatTimestamp(timestamp)}
              </span>
            </p>
          </div>
          <Editor notes={notes} setNotes={setNotes} />

          <div className="self-end grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditing(false), setNotes("");
              }}
            >
              Cancel
            </Button>
            <Button variant="outline" onClick={() => saveNote("", notes)}>
              Save
            </Button>
          </div>
        </div>
      ) : null}

      {videoNotes?.map((note: any, index: number) => (
        <NotesCard
          note={note}
          seekTo={seekTo}
          saveNote={saveNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}
