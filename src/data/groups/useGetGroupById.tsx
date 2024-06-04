"use client";

import { getGroupById } from "@/actions/groups";
import { useQuery } from "@tanstack/react-query";

export function useGetGroupById(groupId: string) {
  return useQuery({
    queryFn: async () => getGroupById(groupId),
    queryKey: ["groups", { groupId }],
  });
}
