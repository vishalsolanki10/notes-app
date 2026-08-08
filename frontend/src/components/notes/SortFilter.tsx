type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SortFilter = ({
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label
        htmlFor="sort-filter"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Sort Notes
      </label>

      <select
        id="sort-filter"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
      >
        <option value="">
          Default Order
        </option>

        <option value="title">
          Title (A-Z)
        </option>

        <option value="createdAt">
          Created Date
        </option>

        <option value="updatedAt">
          Updated Date
        </option>
      </select>
    </div>
  );
};

export default SortFilter;