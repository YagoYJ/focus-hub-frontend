"use client";
import { useState } from "react";
import { prioritySchema } from "@/actions/types";
import { Header } from "@/components/Header";
import { PrioritiesList } from "@/components/PrioritiesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useGetGroupById } from "@/data/groups/useGetGroupById";
import { useGetPrioritiesGroup } from "@/data/priorities/useGetPrioritiesByGroup";
import { z } from "zod";
import { PriorityDetails } from "@/components/PriorityDetails";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PropertiesParams {
  params: {
    groupId: string;
  };
}

export default function Priorities({ params: { groupId } }: PropertiesParams) {
  const { data: group } = useGetGroupById(groupId);
  const { data: priorities } = useGetPrioritiesGroup({ groupId });
  const [activePriority, setActivePriority] = useState("");

  function changeActivePriority(id: string) {
    setActivePriority(id);
  }

  if (group) {
    const validData = z.array(prioritySchema).safeParse(priorities);

    return (
      <div className="min-w-screen min-h-screen flex flex-col items-center">
        <Header />

        <main className="w-11/12 max-w-5xl mb-8">
          <Button asChild variant="link" className="text-xs self-start p-0">
            <Link href="/">
              <ChevronLeft size={15} />
              Go back
            </Link>
          </Button>

          <h2 className="my-8 text-3xl font-bold">{group.name}</h2>

          {validData.success && (
            <div className="flex gap-14 justify-between">
              <Tabs defaultValue="todo" className="flex-1">
                <TabsList>
                  <TabsTrigger className="w-36" value="todo">
                    To do
                  </TabsTrigger>
                  <TabsTrigger className="w-36" value="completed">
                    Completed
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="todo">
                  <PrioritiesList
                    priorities={validData.data.filter(
                      (item) => !item.completed
                    )}
                    activePriority={activePriority}
                    changeActivePriority={changeActivePriority}
                  />
                </TabsContent>

                <TabsContent value="completed">
                  <PrioritiesList
                    priorities={validData.data.filter((item) => item.completed)}
                    activePriority={activePriority}
                    changeActivePriority={changeActivePriority}
                  />
                </TabsContent>
              </Tabs>

              <aside className="flex-1">
                <PriorityDetails
                  groupId={groupId}
                  priorityId={activePriority || ''}
                />
              </aside>
            </div>
          )}
        </main>
      </div>
    );
  }
}
