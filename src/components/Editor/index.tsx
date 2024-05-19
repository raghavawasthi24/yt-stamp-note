"use client";
import React, { useCallback, useState } from "react";
import "./style.scss";

import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./Menubar";

interface User {
  name: string;
  color: string;
}

const Editor = ({notes, setNotes}:any) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({ limit: 10000 }),
    ],
    content: `${notes}`,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      setNotes(editor.getHTML());
    }
  });

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content outline-none" editor={editor}/>
    </div>
  );
};

export default Editor;
