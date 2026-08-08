import { api } from "./client";

export const getNotes = async () => {
  const response = await api.get("/notes");

  return response.data;
};

export const createNote = async (
  payload: {
    title: string;
    content: string;
    tags: string[];
  }
) => {
  const response = await api.post(
    "/notes",
    payload
  );

  return response.data;
}