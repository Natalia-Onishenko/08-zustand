"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes, type FetchNotesResponse } from "../../../../lib/api";
import type { NoteTag } from "../../../../types/note";

import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";

import css from "./NotesPage.module.css";

type Props = {
  tagFromUrl: string; 
};

export default function NotesClient({ tagFromUrl }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tagForApi: NoteTag | undefined =
    tagFromUrl === "all" ? undefined : (tagFromUrl as NoteTag);

  const initialPage = Number(searchParams.get("page") ?? "1");
  const initialSearch = searchParams.get("search") ?? "";

  const [page, setPage] = useState<number>(
    Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1
  );
  const [searchValue, setSearchValue] = useState<string>(initialSearch);
  const [debouncedSearch] = useDebounce(searchValue, 400);

  
  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) next.set("search", debouncedSearch);
    else next.delete("search");

    next.set("page", "1");
    setPage(1);

    router.push(
      `/notes/filter/${encodeURIComponent(tagFromUrl)}?${next.toString()}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, tagFromUrl]);

  // --- sync URL when page changes ---
  useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(page));

    router.push(
      `/notes/filter/${encodeURIComponent(tagFromUrl)}?${next.toString()}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const queryKey = useMemo(
    () => ["notes", { page, search: debouncedSearch, tag: tagFromUrl }],
    [page, debouncedSearch, tagFromUrl]
  );

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: debouncedSearch || undefined,
        tag: tagForApi,
      }),
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (selected: number) => setPage(selected + 1);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={searchValue} onChange={setSearchValue} />

        <Link href="/notes/action/create" className={css.button}>
          Create note
        </Link>
      </div>

      <Pagination
        pageCount={data.totalPages}
        currentPage={page - 1}
        onPageChange={handlePageChange}
      />

      <NoteList notes={data.notes} />
    </div>
  );
}