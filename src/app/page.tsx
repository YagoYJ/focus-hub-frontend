import { Header } from "@/components/Header";
import { Groups } from "@/components/Groups";
import { Toaster } from "@/components/ui/Sonner";
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getGroups } from "@/actions/groups";
import { queryClient } from "@/lib/queryClient";

export default async function Home() {
  await queryClient.prefetchQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center">
      <Header />

      <main className="w-11/12 max-w-5xl mb-8">
        <h2 className="my-8 text-3xl font-bold">Groups</h2>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Groups />
        </HydrationBoundary>
      </main>

      <Toaster richColors />
    </div>
  );
}
