import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: NoteTag[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  return {
    title: `${slug[0]} notes`,
    description: `Browse and manage your notes tagged with ${slug[0]}.`,
    openGraph: {
      title: `${slug[0]} notes`,
      type: 'website',
      description: `Browse and manage your notes tagged with ${slug[0]}.`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub preview image',
        },
      ],
    },
  };
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0].toLocaleLowerCase() === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ tag, page: 1, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
