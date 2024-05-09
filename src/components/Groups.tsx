"use client";
import { useGetGroups } from "@/data/groups/useGetGroups";
import { GroupCard } from "./GroupCard";
import { Skeleton } from "./ui/Skeleton";
import { CreateGroupDialog } from "./CreateGroupDialog";

export function Groups() {
  const { data, isLoading } = useGetGroups();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from(new Array(7)).map((_, index) => (
          <Skeleton key={index} className="h-52 rounded-xl" />
        ))}
      </div>
    );
  }

  if (data) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CreateGroupDialog />

          {data.length > 0 &&
            data.map((group) => <GroupCard key={group.id} {...group} />)}
        </div>
      </>
    );
  }
}
