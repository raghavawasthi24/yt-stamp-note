import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/services/formatDate";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import NotesCard from "./notes-card";
import { nanoid } from "nanoid";
import { formatTimestamp } from "@/services/formatTimeStamp";

// Define interfaces for props and note structure
interface Note {
  nano: string;
  notes: string;
  timestamp: number;
  currentDay: string;
}

interface NotesProps {
  addNote: () => void;
  timestamp: number;
  videoId: string;
  seekTo: (time: number) => void;
}

const Notes: React.FC<NotesProps> = ({
  addNote,
  timestamp,
  videoId,
  seekTo,
}) => {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState("");
  const [videoNotes, setVideoNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem(videoId);
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [currentDay, setCurrentDay] = useState<string>("");

  const saveNote = (id?: string, notesText?: string) => {
    console.log(id);
    if (id) {
      videoNotes.forEach((note: any) => {
        if (note.nano === id) {
          note.notes = notesText;
        }
      });
    } else {
      console.log("here");
      const newNote: Note = {
        nano: nanoid(),
        notes: notesText ?? notes,
        timestamp,
        currentDay,
      };
      videoNotes?.push(newNote);
    }
    localStorage.setItem(videoId, JSON.stringify(videoNotes));
    setEditing(false);
    setNotes("");
  };

  const deleteNote = (id: string) => {
    const updatedNotes = videoNotes.filter((note) => note.nano !== id);
    setVideoNotes(updatedNotes);
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  return (
    <div className="grid gap-6 border p-6 rounded-xl">
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">My notes</p>
          <p>
            All your notes at a single place. Click on any note to go to the
            specific timestamp in the video.
          </p>
        </div>
        <Button
          variant="outline"
          className="font-semibold"
          onClick={() => {
            setCurrentDay(formatDate(new Date()));
            addNote();
            setEditing(true);
          }}
        >
          <CiCirclePlus className="w-5 h-5 mr-2" />
          Add new note
        </Button>
      </div>

      {editing && (
        <div className="flex flex-col gap-4">
          <div>
            <p>{formatDate(new Date())}</p>
            <p>
              Timestamp:{" "}
              <span className="text-purple-700">
                {formatTimestamp(timestamp)}
              </span>
            </p>
          </div>
          <Editor notes={notes} setNotes={setNotes} />

          <div className="self-end grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => saveNote()}>
              Save
            </Button>
          </div>
        </div>
      )}

      {videoNotes.map((note) => (
        <NotesCard
          key={note.nano}
          note={note}
          seekTo={seekTo}
          saveNote={saveNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default Notes;
