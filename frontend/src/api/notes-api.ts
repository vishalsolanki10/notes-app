import { api } from "./client";

export const getNotes = async (
  search?: string
) => {
  const response = await api.get(
    "/notes",
    {
      params: {
        search,
      },
    }
  );

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

export const deleteNote = async (
  id: string
) => {
  const response = await api.delete(
    `/notes/${id}`
  );

  return response.data;
};

export const updateNote = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    title?: string;
    content?: string;
    tags?: string[];
  };
}) => {
  const response = await api.patch(
    `/notes/${id}`,
    payload
  );

  return response.data;
};