import { Priority } from "@/actions/types";
import { Card, CardContent } from "./ui/Card";
import { cn } from "@/lib/utils";
import { CreatePriorityDialog } from "./CreatePriorityDialog";

interface Props {
  priorities: Priority[];
  activePriority: string;
  changeActivePriority: (id: string) => void;
}

export function PrioritiesList({
  priorities,
  activePriority,
  changeActivePriority,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <CreatePriorityDialog />

      {priorities.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "w-full cursor-pointer rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            activePriority === item.id && "bg-muted/50"
          )}
          onClick={() => changeActivePriority(item.id)}
        >
          <CardContent className="p-3">{item.name}</CardContent>
        </Card>
      ))}
    </div>
  );
}
