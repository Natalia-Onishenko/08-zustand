// app/notes/[id]/page.tsx
import type { Metadata } from "next";
import { fetchNoteById } from "../../../lib/api";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `${note.title} | NoteHub`;
    const description =
      note.content.length > 140
        ? `${note.content.slice(0, 140)}…`
        : note.content;

    const url = `${siteUrl}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note details | NoteHub",
      description: "NoteHub: view note details.",
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);


  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
    </main>
  );
}