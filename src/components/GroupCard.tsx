import { Group, prioritySchema } from "@/actions/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Separator } from "./ui/Separator";
import { Skeleton } from "./ui/Skeleton";
import { useGetPrioritiesGroup } from "@/data/priorities/useGetPrioritiesByGroup";
import { z } from "zod";

export function GroupCard({ id, name }: Group) {
  const { data, isLoading } = useGetPrioritiesGroup({ groupId: id, limit: 3 });

  if (isLoading) {
    return <Skeleton className="h-52 rounded-xl" />;
  }

  if (data) {
    const validData = z.array(prioritySchema).safeParse(data);

    return (
      <Card className="cursor-pointer hover:bg-muted/50 h-52">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="flex flex-col gap-2">
            {validData.success &&
              (validData.data.length > 0 ? (
                validData.data.map((priority) => (
                  <li key={priority.id}>
                    <span className="block mb-2">{priority.name}</span>
                    <Separator />
                  </li>
                ))
              ) : (
                <span className="text-md font-extralight">No priorities</span>
              ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
}
