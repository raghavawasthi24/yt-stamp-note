import { Button } from "@/components/ui/button";
import { formatDate } from "@/services/formatDate";
import { htmlStringToPlainText} from "@/services/htmlToPlainText";
import React from "react";

export default function NotesCard({ note }: any) {
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
            <p>Timestamp: {formatTimestamp(note.timestamp)}</p>
        </div>
        <p className="border p-3 rounded-r-lg rounded-b-lg" dangerouslySetInnerHTML={{ __html: note.notes }}>
        </p>

        <div className="self-end grid grid-cols-2 gap-2">
            <Button variant="outline">Delete</Button>
            <Button variant="outline">Edit</Button>
        </div>
    </div>
  );
}
