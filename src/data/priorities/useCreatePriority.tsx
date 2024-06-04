"use client";

import { createPriority } from "@/actions/priorities";
import { CreatePriority, Priority } from "@/actions/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseCreateGroupProps = {
  closeDialog: () => void;
};

export function useCreatePriority({ closeDialog }: UseCreateGroupProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description, groupId }: CreatePriority) =>
      createPriority({ name, description, groupId }),
    onSuccess: (data, variables) => {
      const { groupId, name } = variables;

      const cache = queryClient.getQueryData([
        "priorities",
        { groupId },
      ]) as Priority[];

      queryClient.setQueryData(["priorities", { groupId }], [...cache, data]);

      toast.success(`The priority ${name} was created`);

      closeDialog();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
}
