import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useDeleteSnippet = () => {
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);

  return deleteSnippet;
};

export default useDeleteSnippet;
