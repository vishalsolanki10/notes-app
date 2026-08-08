type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

const SearchBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="mt-6">
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search notes by title or content..."
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
};

export default SearchBar;