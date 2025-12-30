"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "../../../../lib/api";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const close = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <button className={css.closeButton} type="button" onClick={close}>
            ×
          </button>
        </div>

        <p className={css.tag}>Tag: {note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </Modal>
  );
}