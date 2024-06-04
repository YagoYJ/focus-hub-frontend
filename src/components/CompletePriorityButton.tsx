import { Check } from "lucide-react";
import { Button } from "./ui/Button";
import { useCompletePriority } from "@/data/priorities/useCompletePriority";

interface Props {
  groupId: string;
  priorityId: string;
}

export function CompletePriorityButton({ groupId, priorityId }: Props) {
  const { mutateAsync: completePriority, isPending } = useCompletePriority();

  function handleCompletePriority() {
    completePriority({ groupId, priorityId });
  }

  return (
    <Button type="button" variant="success" onClick={handleCompletePriority} isLoading={isPending}>
      <Check size={15} className="mr-2" /> Mark as done
    </Button>
  );
}
