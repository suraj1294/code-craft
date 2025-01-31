import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useSaveExecution = () => {
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  return saveExecution;
};

export default useSaveExecution;
