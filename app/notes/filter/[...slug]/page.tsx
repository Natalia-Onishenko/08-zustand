import type { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { fetchNotes, fetchQueryClient } from "../../../../lib/api";
import type { NoteTag } from "../../../../types/note";
import NotesClient from "./Notes.client";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic";

function decodeTagFromSlug(slug?: string[]): string {
  return decodeURIComponent(slug?.[0] ?? "all");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeTagFromSlug(resolvedParams.slug);

  return {
    title: tag === "all" ? "Notes | NoteHub" : `Notes: ${tag} | NoteHub`,
    description:
      tag === "all" ? "Browse your notes" : `Notes filtered by tag: ${tag}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const tagFromUrl = decodeTagFromSlug(resolvedParams.slug);

  const tagForApi: NoteTag | undefined =
    tagFromUrl === "all" ? undefined : (tagFromUrl as NoteTag);

  const page = Number(resolvedSearchParams.page ?? "1");

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";

  const queryClient = fetchQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, search, tag: tagForApi }],
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
      <NotesClient tagFromUrl={tagFromUrl} />
    </HydrationBoundary>
  );
}