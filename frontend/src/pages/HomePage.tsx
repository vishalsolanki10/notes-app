import { useState } from "react";

import NotesList from "../components/notes/NotesList";
import CreateNoteForm from "../components/notes/CreateNoteForm";
import { useDebounce } from "../hooks/use-debounce";
import TagFilter from "../components/notes/TagFilter";
import SearchBar from "../components/notes/SearchBar";
import SortFilter from "../components/notes/SortFilter";

import type { Note } from "../types/note";

const HomePage = () => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] =  useState("");
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
      <div className="mt-4">
        <TagFilter
          value={selectedTag}
          onChange={setSelectedTag}
        />
      </div>
      <div className="mt-4">
        <SortFilter
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      <NotesList
        search={debouncedSearch}
        tag={selectedTag}
        sort={sortBy}
        setEditingNote={setEditingNote}
      />
    </div>
  );
};

export default HomePage;