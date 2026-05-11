'use client';

import { useQuery } from '@tanstack/react-query';
import css from './NoteDetails.module.css';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

type Params = {
  id: string;
};

export default function NoteDetailsClient() {
  const { id } = useParams<Params>();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && !isError && (
        <div className={css['card-wrapper']}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
