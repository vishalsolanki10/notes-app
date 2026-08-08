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
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Sort Notes
      </label>

      <select
        id="sort-filter"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        <option
          value=""
          className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        >
          Default Order
        </option>

        <option
          value="title"
          className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        >
          Title (A-Z)
        </option>

        <option
          value="createdAt"
          className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        >
          Created Date
        </option>

        <option
          value="updatedAt"
          className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        >
          Updated Date
        </option>
      </select>
    </div>
  );
};

export default SortFilter;