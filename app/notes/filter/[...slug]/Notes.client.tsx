'use client';

import SearchBox from '@/components/SearchBox/SearchBox';
import css from './Notes.module.css';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import NoContent from '@/components/NoContent/NoContent';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { NoteTag } from '@/types/note';

interface NotesClientProps {
  tag: NoteTag | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, 300);

  const hasData = isSuccess && data.notes.length > 0;
  const isNoContent = isSuccess && data.notes.length === 0;
  const isPaginated = isSuccess && data.totalPages > 1;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={handleChange} />
        {isPaginated && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            setPage={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsOpenModal(true)}>
          Create note +
        </button>
      </header>

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {isNoContent && <NoContent />}
      {hasData && <NoteList notes={data.notes} />}

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm closeModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
