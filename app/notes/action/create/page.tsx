import type { Metadata } from "next";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "NoteHub | Create note",
  description: "Create a new note in NoteHub.",
  alternates: { canonical: "/notes/action/create" },
  openGraph: {
    title: "NoteHub | Create note",
    description: "Create a new note in NoteHub.",
    url: "/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}