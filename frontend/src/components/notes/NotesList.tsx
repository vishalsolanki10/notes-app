import { useNotes } from "../../hooks/use-notes";
import NoteCard from "./NoteCard";
import type { Note } from "../../types/note";

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
      {notes.map((note: Note) => (
        <NoteCard
          key={note.id}
          note={note}
          setEditingNote={setEditingNote}
        />
      ))}
    </div>
  );
};

export default NotesList;