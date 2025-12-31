import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type MetaProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0] ?? "all";
  const tag = decodeURIComponent(rawTag);

  const title =
    tag === "all" ? "All notes | NoteHub" : `${tag} notes | NoteHub`;

  const description =
    tag === "all"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by tag: ${tag}.`;

  const url = `${SITE_URL}/notes/filter/${encodeURIComponent(tag)}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
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
}

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes, fetchQueryClient } from "../../../../lib/api";
import type { NoteTag } from "../../../../types/note";
import NotesClient from "./Notes.client";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const rawTag = resolvedParams.slug?.[0] ?? "all";
  const tagFromUrl = decodeURIComponent(rawTag);

  const tagForApi: NoteTag | undefined =
    tagFromUrl === "all" ? undefined : (tagFromUrl as NoteTag);

  const page = Number(resolvedSearchParams.page ?? "1");
  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";

  const queryClient = fetchQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, search, tag: tagFromUrl }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: search || undefined,
        tag: tagForApi,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}