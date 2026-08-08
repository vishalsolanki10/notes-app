import { useTags } from "../../hooks/use-tags";

type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
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
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Filter By Tag
      </label>

      <select
        id="tag-filter"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 p-3"
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