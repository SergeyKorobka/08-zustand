import type { NewNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteState {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-storage',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
