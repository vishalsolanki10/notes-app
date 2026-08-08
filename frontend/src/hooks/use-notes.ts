import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notes-api";

export const useNotes = (
  search: string,
  tag: string
) => {
  return useQuery({
    queryKey: [
      "notes",
      search,
      tag,
    ],

    queryFn: () =>
      getNotes(search, tag),
  });
};