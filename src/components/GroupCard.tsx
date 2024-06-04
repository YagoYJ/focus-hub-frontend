import { Group, prioritySchema } from "@/actions/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Separator } from "./ui/Separator";
import { Skeleton } from "./ui/Skeleton";
import { useGetPrioritiesGroup } from "@/data/priorities/useGetPrioritiesByGroup";
import { z } from "zod";
import Link from "next/link";

export function GroupCard({ id, name }: Group) {
  const { data, isLoading } = useGetPrioritiesGroup({ groupId: id });

  if (isLoading) {
    return <Skeleton className="h-52 rounded-xl" />;
  }

  if (data) {
    const validData = z.array(prioritySchema).safeParse(data);

    return (
      <Link href={`/priorities/${id}`}>
        <Card className="group cursor-pointer h-52 shadow-sm hover:bg-accent hover:text-accent-foreground">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="flex flex-col gap-2">
              {validData.success &&
                (validData.data.length > 0 ? (
                  validData.data.slice(0, 3).map((priority) => (
                    <li key={priority.id}>
                      <span className="block mb-2">{priority.name}</span>
                      <Separator className="group-hover:bg-accent-foreground" />
                    </li>
                  ))
                ) : (
                  <span className="text-md font-extralight">No priorities</span>
                ))}
            </ul>
          </CardContent>
        </Card>
      </Link>
    );
  }
}
