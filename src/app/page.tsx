import { Header } from "@/components/Header";
import { Groups } from "@/components/Groups";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getGroups } from "@/actions/groups";

export default async function Home() {
  const queryClient = new QueryClient();

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
    </div>
  );
}
