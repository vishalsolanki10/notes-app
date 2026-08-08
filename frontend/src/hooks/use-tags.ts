import { useQuery } from "@tanstack/react-query";

import { getTags } from "../api/tags-api";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};