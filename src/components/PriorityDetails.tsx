import { useGetPriorityById } from "@/data/priorities/useGetPriorityById";
import { prioritySchema } from "@/actions/types";
import { PriorityEditForm } from "./PriorityEditForm";
import { useMemo } from "react";
import { Skeleton } from "./ui/Skeleton";

interface Props {
  priorityId: string;
  groupId: string;
}

export function PriorityDetails({ groupId, priorityId }: Props) {
  const { data: priority, isLoading } = useGetPriorityById({
    groupId,
    priorityId,
  });

  const validData = useMemo(
    () => prioritySchema.safeParse(priority),
    [priority]
  );

  if (isLoading) {
    return (
      <div className="space-y-8 flex flex-col">
        <div className="space-y-2">
          <Skeleton className="w-10 h-6 rounded" />
          <Skeleton className="w-full h-9 rounded" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-[76px] h-6 rounded" />
          <Skeleton className="w-full h-16 rounded" />
        </div>

        <div className="w-full flex items-center justify-end gap-2">
          <Skeleton className="w-20 h-9" />
          <Skeleton className="w-36 h-9" />
        </div>
      </div>
    );
  }

  if (validData.success) return <PriorityEditForm priority={validData.data} />;
}
