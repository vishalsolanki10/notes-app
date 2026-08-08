import { useNotes } from "../../hooks/use-notes";
import NoteCard from "./NoteCard";
import type { Note } from "../../types/note";

type Props = {
  search: string;

  setEditingNote: (
    note: Note | null
  ) => void;
};

const NotesList = ({
  search,
  setEditingNote,
}: Props) => {
  const {
    data,
    isLoading,
    isError,
  } = useNotes(search);

  if (isLoading) {
    return (
      <p className="mt-4">
        Loading notes...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="mt-4 text-red-500">
        Failed to load notes
      </p>
    );
  }

  const notes = data?.data || [];

  if (!notes.length) {
    return (
      <p className="mt-4">
        No notes found
      </p>
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