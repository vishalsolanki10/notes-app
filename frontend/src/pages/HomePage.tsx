import { useState, useRef, useEffect } from "react";
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
  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editScrollTrigger, setEditScrollTrigger] = useState(0);

  const debouncedSearch = useDebounce(search);
  const { theme, toggleTheme } = useTheme();
  const isOnline = useOnlineStatus();

  // Ref for Create/Edit Note section
  const noteFormRef = useRef<HTMLDivElement>(null);

  // Scroll to Create/Edit Note form when editing starts
  useEffect(() => {
    if (!editingNote) return;

    const timer = setTimeout(() => {
      const element = noteFormRef.current;

      if (!element) return;

      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        20;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [editingNote, editScrollTrigger]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Notes
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Capture ideas, tasks and everything worth remembering.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {theme === "light"
              ? "🌙 Dark"
              : "☀️ Light"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Offline */}
        {!isOnline && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
            <p className="font-medium text-amber-800 dark:text-amber-300">
              📡 You are offline
            </p>

            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
              Some actions may not work until your
              internet connection is restored.
            </p>
          </div>
        )}

        {/* CREATE / EDIT NOTE */}
        <div ref={noteFormRef}>
          <CreateNoteForm
            editingNote={editingNote}
            setEditingNote={setEditingNote}
          />
        </div>

        {/* Search & Filters */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-lg font-semibold">
              Find your notes
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Search, filter and sort your notes.
            </p>
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TagFilter
              value={selectedTag}
              onChange={setSelectedTag}
            />

            <SortFilter
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </section>

        {/* Notes */}
        <section className="mt-6">
          <NotesList
            search={debouncedSearch}
            tag={selectedTag}
            sort={sortBy}
            setEditingNote={setEditingNote}
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;