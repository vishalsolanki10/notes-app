import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import NotesList from "../components/notes/NotesList";
import CreateNoteForm from "../components/notes/CreateNoteForm";
import { useDebounce } from "../hooks/use-debounce";
import TagFilter from "../components/notes/TagFilter";
import SearchBar from "../components/notes/SearchBar";
import SortFilter from "../components/notes/SortFilter";
import { useOnlineStatus } from "../hooks/use-online-status";

import type { Note } from "../types/note";

const HomePage = () => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("");

  const debouncedSearch = useDebounce(search);
  const { theme, toggleTheme } = useTheme();
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notes App</h1>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {!isOnline && (
        <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-950">
          <p className="font-medium text-yellow-800 dark:text-yellow-200">
            📡 You are offline
          </p>

          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Some actions may not work until your internet connection is
            restored.
          </p>
        </div>
      )}

      <CreateNoteForm
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />
      <SearchBar value={search} onChange={setSearch} />
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