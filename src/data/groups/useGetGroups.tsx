"use client";

import { createGroup, getGroups } from "@/actions/groups";
import { CreateGroup, Group } from "@/actions/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetGroups() {
  return useQuery({
    queryFn: async () => getGroups(),
    queryKey: ["groups"],
  });
}

type UseCreateGroupProps = {
  closeDialog: () => void;
};

export function useCreateGroup({ closeDialog }: UseCreateGroupProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: CreateGroup) => createGroup({ name }),
    onSuccess: (data, variables) => {
      const cache = queryClient.getQueryData(["groups"]) as Group[];
      queryClient.setQueryData(
        ["groups"],
        [
          ...cache,
          data
        ]
      );

      toast.success(`The group ${variables.name} was created`);

      closeDialog();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
}
