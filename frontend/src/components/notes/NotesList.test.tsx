import { render, screen } from "@testing-library/react";
import NotesList from "./NotesList";

vi.mock("../../hooks/use-notes", () => ({
  useNotes: () => ({
    data: {
      data: [],
    },
    isLoading: false,
    isError: false,
  }),
}));

describe("NotesList", () => {
  it("renders empty state when no notes exist", () => {
    render(
      <NotesList
        search=""
        tag=""
        sort=""
        setEditingNote={() => {}}
      />
    );

    expect(
      screen.getByText("No notes found")
    ).toBeInTheDocument();
  });
});