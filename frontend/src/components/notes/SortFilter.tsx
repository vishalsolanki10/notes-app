type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

const SortFilter = ({
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label
        htmlFor="sort-filter"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Sort Notes
      </label>

      <select
        id="sort-filter"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 p-3"
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