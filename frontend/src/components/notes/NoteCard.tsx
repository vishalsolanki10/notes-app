import type { Note } from "../../types/note";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-lg">
        {note.title}
      </h3>

      <p className="mt-2 text-gray-600">
        {note.content}
      </p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-100 px-2 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NoteCard;