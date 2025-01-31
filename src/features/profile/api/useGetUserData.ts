import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const useGetUserData = (id: string) => {
  const userData = useQuery(api.users.getUser, { userId: id ?? "" });

  return userData;
};

export default useGetUserData;
