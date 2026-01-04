import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/queryClient";
import { fetchNotes } from "@/lib/api";
import HydrateClient from "./Hydrate.client";
import NotesClient from "./Notes.client";

type Props = { params: Promise<{ slug: string[] }> };

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const raw = slug?.[0];
  const tag = raw === "all" ? undefined : raw;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, perPage: 20, search: "", tag }],
    queryFn: () => fetchNotes({ page: 1, perPage: 20, search: "", tag }),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrateClient state={state}>
      <NotesClient tag={tag} />
    </HydrateClient>
  );
}
