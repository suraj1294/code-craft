import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useCreateSnippet = () => {
  const createSnippet = useMutation(api.snippets.createSnippet);

  return createSnippet;
};

export default useCreateSnippet;
