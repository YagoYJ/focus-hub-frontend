"use client";

import { getGroups } from "@/actions/groups";
import { useQuery } from "@tanstack/react-query";

export function useGetGroups() {
  return useQuery({
    queryFn: async () => getGroups(),
    queryKey: ["groups"],
  });
}
