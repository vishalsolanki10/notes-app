import { render, screen } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import CreateNoteForm from "./CreateNoteForm";

describe("CreateNoteForm", () => {
  it("renders create note form", () => {
    const queryClient =
      new QueryClient();

    render(
      <QueryClientProvider
        client={queryClient}
      >
        <CreateNoteForm
          editingNote={null}
          setEditingNote={() => { }}
        />
      </QueryClientProvider>
    );

    expect(
      screen.getByText("Create New Note")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Title")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Content")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Tags")
    ).toBeInTheDocument();
  });
  it("renders edit mode when editingNote is provided", () => {
  const queryClient =
    new QueryClient();

  render(
    <QueryClientProvider
      client={queryClient}
    >
      <CreateNoteForm
        editingNote={{
          id: "1",
          title: "Test Note",
          content: "Test Content",
          tags: ["react"],
          createdAt: "",
          updatedAt: "",
        }}
        setEditingNote={() => {}}
      />
    </QueryClientProvider>
  );

  expect(
    screen.getByText("Edit Note")
  ).toBeInTheDocument();
  });
});