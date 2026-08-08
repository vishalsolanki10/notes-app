import { useNotes } from "../../hooks/use-notes";
import NoteCard from "./NoteCard";
import type { Note } from "../../types/note";
import {
  exportNotesAsJson,
  exportNotesAsMarkdown,
} from "../../utils/export-notes"
type Props = {
  search: string;
  tag: string;
  sort: string;
  setEditingNote: (note: Note | null) => void;
};

const NotesList = ({
  search,
  tag,
  sort,
  setEditingNote,
}: Props) => {
  const {
    data,
    isLoading,
    isError,
  } = useNotes(search, tag, sort);

  if (isLoading) {
    return (
      <div>
        <div className="mt-4 text-2xl">⏳</div>

        <h3 className="mt-4 text-lg font-semibold dark:text-gray-100">
          Loading notes...
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please wait while we fetch your notes.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div className="mt-4 text-2xl">⚠️</div>

        <h3 className="mt-4 text-lg font-semibold text-red-700 dark:text-red-400">
          Failed to load notes
        </h3>

        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          Something went wrong while fetching notes.
          Please try again later.
        </p>
      </div>
    );
  }

  const notes = data?.data || [];

  if (!notes.length) {
    return (
      <div>
        <div className="mt-4 text-2xl">📝</div>

        <h3 className="mt-4 text-lg font-semibold dark:text-gray-100">
          No notes found
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Try creating a new note or adjusting your search and filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Your Notes
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your saved notes.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="mb-4 flex gap-3">
            <button
              type="button"
              onClick={() => exportNotesAsMarkdown(notes)}
              disabled={!notes.length}
              className="cursor-pointer rounded-lg bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white"
            >
              Export Markdown
            </button>

            <button
              type="button"
              onClick={() => exportNotesAsJson(notes)}
              disabled={!notes.length}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export JSON
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            note={note}
            setEditingNote={setEditingNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;