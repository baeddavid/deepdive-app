import { useQuery } from "react-query";
import { useMemo, useContext } from "react";
import { axiosInstance } from "http/axios";
import { SessionContext } from "routes/session";

export const useAppQuery = ({ url, fetchInit = {}, reactQueryOptions }) => {
  const fetch = useMemo(() => {
    return async () => {
      const response = await axiosInstance.get(url, fetchInit);
      return response.data;
    };
  }, [url, fetchInit]);

  return useQuery([url], fetch, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};

export function useSessionsQuery() {
  return useAppQuery({
    url: `/sessions/`,
    reactQueryOptions: { staleTime: 60000 },
  });
}

export function getSessionsQuery() {
  return {
    queryKey: [`/sessions/-${""}`],
    queryFn: async () => await axiosInstance.get("/sessions/"),
    staleTime: 60000,
  };
}

export function useDatabasesQuery() {
  return useAppQuery({
    url: `/databases/`,
    reactQueryOptions: { staleTime: 60000 },
  });
}

export function useVisualizationsQuery() {
  const { session } = useContext(SessionContext);
  return useAppQuery({
    url: `/report/${session.id}`,
    reactQueryOptions: { staleTime: 60000 },
  });
}

export function useUserProfileQuery() {
  return useAppQuery({
    url: "/auth/user/",
    reactQueryOptions: { staleTime: "Infinity" },
  });
}
