import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const useGetComments = (snippetId: Id<"snippets">) => {
  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];

  return comments;
};

export default useGetComments;
