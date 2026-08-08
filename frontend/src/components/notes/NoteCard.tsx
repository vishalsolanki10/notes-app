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
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {note.title}
        </h2>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setEditingNote(note)}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {note.content}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDialog}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        onConfirm={confirmDelete}
        onCancel={() =>
          setShowDialog(false)
        }
      />
    </div>
  );
};

export default NoteCard;