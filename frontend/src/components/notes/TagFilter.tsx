import { useTags } from "../../hooks/use-tags";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TagFilter = ({
  value,
  onChange,
}: Props) => {
  const { data } = useTags();

  const tags = data?.data || [];

  return (
    <div>
      <label
        htmlFor="tag-filter"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Filter by Tag
      </label>

      <select
        id="tag-filter"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
      >
        <option value="">
          All Tags
        </option>

        {tags.map((tag: any) => (
          <option
            key={tag.name}
            value={tag.name}
          >
            {tag.name} ({tag.count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagFilter;