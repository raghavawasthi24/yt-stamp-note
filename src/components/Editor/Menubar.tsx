import "./Menubar.scss";
import React, { Fragment } from "react";
import { Editor } from "@tiptap/react";
import MenuItem from "./MenuItem";
import { MdFormatBold } from "react-icons/md";
import { MdFormatItalic } from "react-icons/md";
import { MdStrikethroughS } from "react-icons/md";
import { FaHighlighter } from "react-icons/fa";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { BsParagraph } from "react-icons/bs";
import { IoMdCode } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { GoTasklist } from "react-icons/go";
import { BiCodeBlock } from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import { MdHorizontalRule } from "react-icons/md";
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";

interface MenuBarProps {
  editor: Editor;
}

interface MenuItemProps {
  icon?: string | React.ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
  type?: "divider";
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const items: MenuItemProps[] = [
    {
      icon: <MdFormatBold />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <MdFormatItalic />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: <MdStrikethroughS />,
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: <IoMdCode />,
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: <FaHighlighter />,
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: <LuHeading1 />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <LuHeading2 />,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <BsParagraph />,
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: <MdFormatListBulleted />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <AiOutlineOrderedList />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <GoTasklist />,
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      icon: <BiCodeBlock />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: <GrBlockQuote />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: <MdHorizontalRule />,
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    }
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className="divider" />
          ) : (
            <MenuItem
              icon={item?.icon || ""}
              title={item?.title || ""}
              action={item?.action || (() => {})}
              isActive={item.isActive}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MenuBar;
