import { useState } from "react";

import NotesList from "../components/notes/NotesList";
import CreateNoteForm from "../components/notes/CreateNoteForm";
import { useDebounce } from "../hooks/use-debounce";
import SearchBar from "../components/notes/SearchBar";

import type { Note } from "../types/note";

const HomePage = () => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">
        Notes App
      </h1>

      <CreateNoteForm
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />
      <SearchBar
        value={search}
        onChange={setSearch}
      />
      <NotesList
        search={debouncedSearch}
        setEditingNote={setEditingNote}
      />
    </div>
  );
};

export default HomePage;