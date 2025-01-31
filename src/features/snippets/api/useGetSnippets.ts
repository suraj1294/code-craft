import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useGetSnippets = () => {
  const snippets = useQuery(api.snippets.getSnippets);

  return snippets;
};

export default useGetSnippets;
