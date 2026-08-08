import { useNotes } from "../../hooks/use-notes";
import NoteCard from "./NoteCard";
import type { Note } from "../../types/note";

type Props = {
  search: string;
  tag: string;
  sort: string;
  setEditingNote: (
    note: Note | null
  ) => void;
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
      <div className="mt-10 rounded-xl border p-8 text-center">
        <div className="text-3xl animate-pulse">
          ⏳
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          Loading notes...
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we fetch your notes.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="text-5xl">
          ⚠️
        </div>

        <h3 className="mt-4 text-lg font-semibold text-red-700">
          Failed to load notes
        </h3>

        <p className="mt-2 text-sm text-red-600">
          Something went wrong while fetching notes.
          Please try again later.
        </p>
      </div>
    );
  }

  const notes = data?.data || [];

  if (!notes.length) {
  return (
      <div className="mt-10 rounded-xl border border-dashed p-8 text-center">
      <div className="text-5xl">
          📝
      </div>

      <h3 className="mt-4 text-lg font-semibold">
          No notes found
      </h3>

      <p className="mt-2 text-sm text-gray-500">
          Try creating a new note or
          adjusting your search and filters.
      </p>
      </div>
  );
  }

  return (
    <div className="mt-6 grid gap-4">
      {notes.map((note: any) => (
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