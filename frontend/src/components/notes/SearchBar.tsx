type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="mt-5">
      <label
        htmlFor="note-search"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Search
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>

        <input
          id="note-search"
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Search notes by title or content..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-800 dark:focus:ring-slate-700"
        />
      </div>
    </div>
  );
};

export default SearchBar;