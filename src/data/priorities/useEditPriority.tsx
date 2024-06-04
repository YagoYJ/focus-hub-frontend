"use client";
import { editPriority } from "@/actions/priorities";
import { EditPriority, Priority } from "@/actions/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  disableForm: () => void;
};

export function useEditPriority({ disableForm }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      groupId,
      priorityId,
    }: EditPriority) =>
      editPriority({ name, description, groupId, priorityId }),
    onSuccess: (_, variables) => {
      const { name, description, groupId, priorityId } = variables;

      const cache = queryClient.getQueryData([
        "priorities",
        { groupId },
      ]) as Priority[];

      const updatedCache = cache.map((priority) =>
        priority.id === priorityId
          ? { ...priority, name, description }
          : priority
      );

      queryClient.setQueryData(["priorities", { groupId }], updatedCache);

      disableForm();

      toast.success(`The priority ${name} was updated`);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
}
