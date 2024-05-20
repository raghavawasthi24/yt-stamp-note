import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { formatTimestamp } from "@/services/formatTimeStamp";
import React, { useState } from "react";

// Define the props interface for NotesCard
interface NotesCardProps {
  note: {
    nano: string;
    notes: string;
    timestamp: number;
    currentDay: string;
  };
  seekTo: (time: number) => void;
  saveNote: (id: string, notes: string) => void;
  deleteNote: (id: string) => void;
}

const NotesCard: React.FC<NotesCardProps> = ({
  note,
  seekTo,
  saveNote,
  deleteNote,
}) => {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(note.notes);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>{note.currentDay}</p>
        <p onClick={() => seekTo(note.timestamp)} className="cursor-pointer">
          Timestamp:{" "}
          <span className="text-purple-900">
            {formatTimestamp(note.timestamp)}
          </span>
        </p>
      </div>

      {editing ? (
        <div className="flex flex-col gap-4">
          <Editor notes={notes} setNotes={setNotes} />
          <div className="self-end grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => {setEditing(false)}}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                saveNote(note.nano, notes);
                setEditing(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p
            className="border p-3 rounded-r-lg rounded-b-lg"
            dangerouslySetInnerHTML={{ __html: note.notes }}
          ></p>
          <div className="self-end grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => deleteNote(note.nano)}>
              Delete
            </Button>
            <Button variant="outline" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesCard;
