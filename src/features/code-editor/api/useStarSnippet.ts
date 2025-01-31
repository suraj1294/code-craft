import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useStarSnippet = () => {
  const star = useMutation(api.snippets.starSnippet);
  return star;
};

export default useStarSnippet;
