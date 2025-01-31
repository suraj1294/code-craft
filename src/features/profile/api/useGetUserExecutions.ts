import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useGetUserExecutions = (id: string, initialNumItems: number = 5) => {
  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    {
      userId: id ?? "",
    },
    { initialNumItems }
  );

  return {
    executions,
    executionStatus,
    isLoadingExecutions,
    loadMore,
  };
};

export default useGetUserExecutions;
