import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/services/formatDate";
import { htmlStringToPlainText } from "@/services/htmlToPlainText";
import React from "react";

export default function NotesCard({ note, seekTo,saveNote, deleteNote }: any) {
  const [editing, setEditing] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")} min ${String(
      remainingSeconds
    ).padStart(2, "0")} sec`;
  };
  
  return (
    <div className="flex flex-col gap-4 ">
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
          <Editor notes={notes} setNotes={setNotes}/>
          <div className="self-end grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditing(false), setNotes("");
              }}
            >
              Cancel
            </Button>
            <Button variant="outline" onClick={()=>{saveNote(note.nano,notes),setEditing(false)}}>
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
            <Button variant="outline" onClick={()=>deleteNote(note.nano)}>Delete</Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditing(true), setNotes(note.notes);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
