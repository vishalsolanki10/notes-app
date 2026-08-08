import { useState } from "react";

import ConfirmDialog from "../ui/ConfirmDialog";
import type { Note } from "../../types/note";
import { useDeleteNote } from "../../hooks/use-delete-note";

type Props = {
  note: Note;
  setEditingNote: (note: Note | null) => void;
};

const NoteCard = ({
  note,
  setEditingNote,
}: Props) => {
  const [showDialog, setShowDialog] =
    useState(false);

  const deleteMutation = useDeleteNote();

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = () => {
    setEditingNote(null);

    deleteMutation.mutate(note.id);

    setShowDialog(false);
  };

return (
  <>
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {note.title}
        </h3>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() =>
              setEditingNote(note)
            }
            className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
        {note.content}
      </p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>

    <ConfirmDialog
      isOpen={showDialog}
      title="Delete Note"
      message="Are you sure you want to delete this note?"
      onConfirm={confirmDelete}
      onCancel={() =>
        setShowDialog(false)
      }
    />
  </>
);
};

export default NoteCard;