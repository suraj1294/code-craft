import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const useGetSnippetStarred = (snippetId: Id<"snippets">) => {
  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  return isStarred;
};

export default useGetSnippetStarred;
