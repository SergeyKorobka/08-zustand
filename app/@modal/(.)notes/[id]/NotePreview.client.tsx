'use client';

import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Modal from '@/components/Modal/Modal';

type NotePreviewClientProps = {
  id: string;
};

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data && !isError && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>
        )}
        <button
          className={css.backBtn}
          onClick={() => {
            router.back();
          }}
          type="button"
        >
          Back
        </button>
      </div>
    </Modal>
  );
}
