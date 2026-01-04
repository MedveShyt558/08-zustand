import { fetchNoteById } from '@/lib/api';
import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { notFound } from 'next/navigation';
import axios from 'axios';

type Props = { params: Promise<{ id: string }> };

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return <NoteDetails note={note} />;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      notFound();
    }
    throw err;
  }
}
