"use client";
import { completePriority } from "@/actions/priorities";
import { CompletePriority, Priority } from "@/actions/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCompletePriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, priorityId }: CompletePriority) =>
      completePriority({ groupId, priorityId }),
    onSuccess: (_, variables) => {
      const { groupId, priorityId } = variables;

      const cache = queryClient.getQueryData([
        "priorities",
        { groupId },
      ]) as Priority[];

      const updatedCache: Priority[] = cache.map((priority) =>
        priority.id === priorityId ? { ...priority, completed: true } : priority
      );

      queryClient.setQueryData(["priorities", { groupId }], updatedCache);

      toast.success(`Priority completed!`);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
}
