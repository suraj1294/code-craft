import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useAddComment = () => {
  const addComment = useMutation(api.snippets.addComment);
  return addComment;
};

export default useAddComment;
