import { api } from "./client";

export const getTags = async () => {
  const response = await api.get("/tags");

  return response.data;
};