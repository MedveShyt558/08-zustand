import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.slice(0, 100),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 100),
      url: `https://notehub.vercel.app/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  return <NotePreview id={params.id} />;
}
