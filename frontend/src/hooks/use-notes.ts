import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notes-api";

export const useNotes = (
  search: string,
  tag: string,
  sort: string
) => {
  return useQuery({
    queryKey: [
      "notes",
      search,
      tag,
      sort,
    ],

    queryFn: () =>
      getNotes(
        search,
        tag,
        sort
      ),
  });
};