import type { Note, NoteTag } from '@/types/note';
import axios from 'axios';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

interface NotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

const notesApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  search = '',
  page = 1,
  tag,
}: fetchNotesParams) {
  const { data } = await notesApi.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return data;
}

export async function fetchNoteById(noteId: string) {
  const { data } = await notesApi.get<Note>(`/notes/${noteId}`);

  return data;
}

export async function createNote(payload: NotePayload) {
  const { data } = await notesApi.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(noteId: Note['id']) {
  const { data } = await notesApi.delete<Note>(`/notes/${noteId}`);
  return data;
}
