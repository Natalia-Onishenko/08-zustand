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
      <NotesClient tagFromUrl={tagFromUrl} />
    </HydrationBoundary>
  );
}