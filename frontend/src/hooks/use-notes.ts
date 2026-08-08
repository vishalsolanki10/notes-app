import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notes-api";

export const useNotes = (
  search: string
) => {
  return useQuery({
    queryKey: ["notes", search],

    queryFn: () =>
      getNotes(search),
  });
};