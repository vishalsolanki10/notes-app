import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateNote } from "../api/notes-api";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};