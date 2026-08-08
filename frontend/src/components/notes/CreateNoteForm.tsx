import { useEffect, useRef, useState } from "react";
import { useCreateNote } from "../../hooks/use-create-note";
import type { Note } from "../../types/note";
import { useUpdateNote } from "../../hooks/use-update-note";
import { useDebounce } from "../../hooks/use-debounce";

type Props = {
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
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

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedContent = useDebounce(content, 1000);
  const debouncedTags = useDebounce(tags, 1000);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editingNote) {
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
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (editingNote) {
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
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>

            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {editingNote
                ? "Edit Note"
                : "Create New Note"}
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {editingNote
              ? "Changes are automatically saved."
              : "Capture your thoughts, ideas and important information."}
          </p>
        </div>

        {/* Auto-save status */}
        {editingNote && (
          <div className="shrink-0">
            {saveStatus === "saving" && (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800 shadow-sm dark:border-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500" />
                Saving...
              </span>
            )}

            {saveStatus === "saved" && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm dark:border-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  ✓
                </span>
                Saved
              </span>
            )}

            {saveStatus === "idle" && (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                Editing
              </span>
            )}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="mb-5 mt-6">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
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
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-800 dark:focus:ring-slate-700"
        />
      </div>

      {/* Content */}
      <div className="mb-5">
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          Content
        </label>

        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Write your note..."
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-800 dark:focus:ring-slate-700"
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label
          htmlFor="tags"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
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
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-800 dark:focus:ring-slate-700"
        />

        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          Separate multiple tags using commas
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {!editingNote && (
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {createMutation.isPending
              ? "Creating..."
              : "+ Create Note"}
          </button>
        )}

        {editingNote && (
          <button
            type="button"
            onClick={() => setEditingNote(null)}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Editing Done!
            <br />
            Back to Create Mode
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateNoteForm;