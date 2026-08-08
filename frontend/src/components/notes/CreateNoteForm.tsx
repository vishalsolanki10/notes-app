import { useEffect } from "react";
import { useState } from "react";
import { useCreateNote } from "../../hooks/use-create-note";
import type { Note } from "../../types/note";
import { useUpdateNote } from "../../hooks/use-update-note";

type Props = {
  editingNote: Note | null;
  setEditingNote: (
    note: Note | null
  ) => void;
};

const CreateNoteForm = ({
  editingNote,
  setEditingNote,
}: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();

useEffect(() => {
  if (editingNote) {
    setTitle(editingNote.title);
    setContent(editingNote.content);
    setTags(editingNote.tags.join(", "));
  } else {
    setTitle("");
    setContent("");
    setTags("");
  }
}, [editingNote]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (editingNote) {
      updateMutation.mutate({
        id: editingNote.id,

        payload: {
          title,
          content,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      });

      setEditingNote(null);

      setTitle("");
      setContent("");
      setTags("");

      return;
    }

    if (!title.trim()) {
      return;
    }

    createMutation.mutate({
      title,
      content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl bg-white p-6 shadow-md"
    >
    <h2 className="mb-6 text-xl font-semibold">
      {editingNote
        ? "Edit Note"
        : "Create New Note"}
    </h2>

      {/* Title */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter note title"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Content
        </label>

        <textarea
          id="content"
          rows={5}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Write your note..."
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label
          htmlFor="tags"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Tags
        </label>

        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
          placeholder="react, frontend, typescript"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
        />

        <p className="mt-1 text-xs text-gray-500">
          Separate multiple tags using commas
        </p>
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="rounded-lg bg-black px-5 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
       {editingNote
        ? "Save Changes"
        : "Create Note"}
      </button>
    </form>
  );
};

export default CreateNoteForm;