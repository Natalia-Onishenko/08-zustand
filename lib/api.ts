import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };

  if (search) params.search = search;
  if (tag) params.tag = String(tag);

  const { data } = await axios.get<FetchNotesResponse>(BASE_URL, { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${BASE_URL}/${id}`);
  return data;
}

export async function createNote(payload: CreateNoteDto): Promise<Note> {
  const { data } = await axios.post<Note>(BASE_URL, payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${id}`);
  return data;
}

export function fetchQueryClient(): QueryClient {
  return new QueryClient();
}