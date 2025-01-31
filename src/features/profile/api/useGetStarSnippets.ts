import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useGetStarSnippets = () => {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  return starredSnippets;
};

export default useGetStarSnippets;
