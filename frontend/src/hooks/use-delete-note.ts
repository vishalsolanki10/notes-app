import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteNote } from "../api/notes-api";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    // Optimistic UI
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["notes"],
      });

      const previousNotes =
        queryClient.getQueryData(["notes"]);

      queryClient.setQueryData(
        ["notes"],
        (old: any) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.filter(
              (note: any) =>
                note.id !== id
            ),
          };
        }
      );

      return {
        previousNotes,
      };
    },

    // Rollback
    onError: (
      _error,
      _id,
      context
    ) => {
      queryClient.setQueryData(
        ["notes"],
        context?.previousNotes
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};