import type { Note } from "../types/note";

export const exportNotesAsJson = (
  notes: Note[]
) => {
  const blob = new Blob(
    [JSON.stringify(notes, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "notes.json";

  link.click();

  URL.revokeObjectURL(url);
};

export const exportNotesAsMarkdown = (
  notes: Note[]
) => {
  const markdown = notes
    .map(
      (note) => `# ${note.title}

${note.content}

${note.tags.length
          ? `**Tags:** ${note.tags.join(", ")}`
          : ""
        }

**Created:** ${note.createdAt}

**Updated:** ${note.updatedAt}

---
`
    )
    .join("\n");

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "notes.md";

  link.click();

  URL.revokeObjectURL(url);
};
