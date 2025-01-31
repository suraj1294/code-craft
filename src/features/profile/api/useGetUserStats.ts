import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useGetUserStats = (id: string) => {
  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: id ?? "",
  });

  return {
    userStats,
  };
};

export default useGetUserStats;
