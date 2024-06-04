"use client";

import { getPrioritiesByGroup } from "@/actions/priorities";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const useGetPrioritiesGroupSchema = z.object({
  groupId: z.string().uuid(),
  limit: z.number().positive().optional()
});

type UseGetPrioritiesGroup = z.infer<typeof useGetPrioritiesGroupSchema>

export function useGetPrioritiesGroup({ groupId, limit = undefined }: UseGetPrioritiesGroup) {
  return useQuery({
    queryFn: async () => getPrioritiesByGroup({ groupId, limit }),
    queryKey: ["priorities", { groupId }],
  });
}
