"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api"; 
import Modal from "../../../components/Modal/Modal"; 

export default function NotePreviewClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      <button type="button" onClick={close}>
        Close
      </button>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load note</p>}

      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>Tag: {data.tag}</p>
          <p>{data.content}</p>
          <p>{new Date(data.createdAt).toLocaleString()}</p>
        </div>
      )}
    </Modal>
  );
}