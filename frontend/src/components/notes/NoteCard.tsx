import { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";
import type { Note } from "../../types/note";
import { useDeleteNote } from "../../hooks/use-delete-note";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const deleteMutation =
    useDeleteNote();

const handleDelete = () => {
  setShowDialog(true);
};

const confirmDelete = () => {
  deleteMutation.mutate(note.id);

  setShowDialog(false);
};

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">
          {note.title}
        </h3>

        <button
          onClick={handleDelete}
          className="text-red-500"
        >
          Delete
        </button>
      </div>

      <p className="mt-2 text-gray-600">
        {note.content}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-100 px-2 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
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