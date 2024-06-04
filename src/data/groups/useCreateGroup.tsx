"use client";

import { createGroup } from "@/actions/groups";
import { CreateGroup, Group } from "@/actions/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseCreateGroupProps = {
  closeDialog: () => void;
};

export function useCreateGroup({ closeDialog }: UseCreateGroupProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: CreateGroup) => createGroup({ name }),
    onSuccess: (data, variables) => {
      const cache = queryClient.getQueryData(["groups"]) as Group[];
      queryClient.setQueryData(["groups"], [...cache, data]);

      toast.success(`The group ${variables.name} was created`);

      closeDialog();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
}
