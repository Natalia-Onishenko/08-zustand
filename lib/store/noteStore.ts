import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "../../types/note";

export const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export type DraftNote = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteStoreState = {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStoreState>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);