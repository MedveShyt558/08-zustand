import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/queryClient";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";
import HydrateClient from "./Hydrate.client";

type Props = { params: Promise<{ id: string }> };

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrateClient state={state}>
      <Modal>
        <NotePreviewClient id={id} />
      </Modal>
    </HydrateClient>
  );
}
