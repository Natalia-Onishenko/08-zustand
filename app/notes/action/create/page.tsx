import type { Metadata } from "next";

import NoteForm from "../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

import { getSiteUrl, OG_IMAGE } from "../../../../lib/seo/site";

const PATH = "/notes/action/create";

function absUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in NoteHub.",
  alternates: {
    canonical: absUrl(PATH),
  },
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub.",
    url: absUrl(PATH),
    images: [OG_IMAGE],
    type: "website",
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