"use client";

import css from "./NotePreview.module.css";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const now = new Date().toLocaleDateString();

  return (
    <div className={css.container}>
      <button className={css.backBtn} type="button" onClick={() => history.back()}>
        Back
      </button>

      <div className={css.item}>
        <div className={css.header}>
          <h2>Note #{noteId}</h2>
          <span className={css.tag}>tag</span>
        </div>

        <div className={css.content}>
          Note preview for ID: {noteId}
        </div>

        <div className={css.date}>{now}</div>
      </div>
    </div>
  );
}