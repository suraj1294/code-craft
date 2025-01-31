import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useDeleteComment = () => {
  const deleteComment = useMutation(api.snippets.deleteComment);
  return deleteComment;
};

export default useDeleteComment;
