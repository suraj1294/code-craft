import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const useGetSnippetStarCount = (snippetId: Id<"snippets">) => {
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });

  return starCount;
};

export default useGetSnippetStarCount;
