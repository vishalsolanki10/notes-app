import { useEffect, useRef, useState } from "react";
import { useCreateNote } from "../../hooks/use-create-note";
import type { Note } from "../../types/note";
import { useUpdateNote } from "../../hooks/use-update-note";
import { useDebounce } from "../../hooks/use-debounce";


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

  const isInitialLoad = useRef(false);
  const [saveStatus, setSaveStatus] =
  useState<"idle" | "saving" | "saved">("idle");

  const debouncedTitle =
    useDebounce(title, 1000);

  const debouncedContent =
    useDebounce(content, 1000);

  const debouncedTags =
    useDebounce(tags, 1000);

  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();

  useEffect(() => {
    if (editingNote) {
      isInitialLoad.current = true;

      setTitle(editingNote.title);
      setContent(editingNote.content);
      setTags(editingNote.tags.join(", "));

      setSaveStatus("idle");
    } else {
      setTitle("");
      setContent("");
      setTags("");
      setSaveStatus("idle");
    }
  }, [editingNote]);

  useEffect(() => {
    if (!editingNote) {
      return;
    }

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    if (
      !debouncedTitle.trim() &&
      !debouncedContent.trim()
    ) {
      return;
    }

    const tagsArray = debouncedTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const isUnchanged =
      debouncedTitle === editingNote.title &&
      debouncedContent === editingNote.content &&
      JSON.stringify(tagsArray) ===
        JSON.stringify(editingNote.tags);

    if (isUnchanged) {
      return;
    }

    setSaveStatus("saving");

    updateMutation.mutate(
      {
        id: editingNote.id,
        payload: {
          title: debouncedTitle,
          content: debouncedContent,
          tags: tagsArray,
        },
      },
      {
        onSuccess: () => {
          setSaveStatus("saved");
        },
      }
    );
  }, [
    editingNote,
    debouncedTitle,
    debouncedContent,
    debouncedTags,
  ]);

  useEffect(() => {
  const handleKeyDown = (
    e: KeyboardEvent
  ) => {
    if (
      e.key === "Escape" &&
      editingNote
    ) {
      setEditingNote(null);
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [editingNote, setEditingNote]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (editingNote) {
      return;
    }
    // if (editingNote) {
    //   updateMutation.mutate({
    //     id: editingNote.id,

    //     payload: {
    //       title,
    //       content,
    //       tags: tags
    //         .split(",")
    //         .map((tag) => tag.trim())
    //         .filter(Boolean),
    //     },
    //   });

    //   setEditingNote(null);

    //   setTitle("");
    //   setContent("");
    //   setTags("");

    //   return;
    // }

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

    {editingNote && (
      <p className="mb-4 text-sm text-gray-500">
        {saveStatus === "saving" &&
          "Saving..."}

        {saveStatus === "saved" &&
          "Saved"}

        {saveStatus === "idle" &&
          "Editing"}
      </p>
    )}

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

    {!editingNote && (
      <button
        type="submit"
        disabled={createMutation.isPending}
        className="rounded-lg bg-black px-5 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {createMutation.isPending
          ? "Creating..."
          : "Create Note"}
      </button>
    )}
    {editingNote && (
      <button
        type="button"
        onClick={() => setEditingNote(null)}
        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
      > Edting Done!
        Back to Create Mode
      </button>
    )}
    </form>
  );
};

export default CreateNoteForm;