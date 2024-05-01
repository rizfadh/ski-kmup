import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Toggle } from "./ui/toggle";
import {
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  Redo,
  Undo,
} from "lucide-react";
import { Button } from "./ui/button";

type TollbarProps = {
  editor: Editor | null;
};

function Toolbar({ editor }: TollbarProps) {
  if (!editor) return null;

  return (
    <div className="sticky top-20 z-10 flex gap-1 overflow-x-auto rounded-md border border-input bg-background p-1 md:top-4 md:w-fit">
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.commands.undo()}
      >
        <Undo className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => editor.commands.redo()}
      >
        <Redo className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-[1.2rem] w-[1.2rem]" />
      </Toggle>
    </div>
  );
}

type TipTapProps = {
  content: string;
  onChange: (content: string) => void;
};

export default function Tiptap({ content, onChange }: TipTapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tuliskan sesuatu...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "bg-background focus:outline-none py-2 prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert",
      },
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
