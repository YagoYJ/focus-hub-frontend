"use client";

import { getPriorityById } from "@/actions/priorities";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const useGetPriorityByIdSchema = z.object({
  groupId: z.string().uuid(),
  priorityId: z.string().uuid(),
});

type UseGetPriority = z.infer<typeof useGetPriorityByIdSchema>;

export function useGetPriorityById({ groupId, priorityId }: UseGetPriority) {
  return useQuery({
    queryFn: async () => getPriorityById({ groupId, priorityId }),
    queryKey: ["priorities", { groupId, priorityId }],
  });
}
