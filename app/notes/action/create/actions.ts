"use server";

import { createNote } from "../../../../lib/api";
import type { NoteTag } from "../../../../types/note";

export type CreateActionState =
  | { ok: false; error: string }
  | { ok: true; error?: never };

const allowedTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export async function createNoteAction(
  _prevState: CreateActionState,
  formData: FormData
): Promise<CreateActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const rawTag = String(formData.get("tag") ?? "Todo") as NoteTag;

  const tag: NoteTag = allowedTags.includes(rawTag) ? rawTag : "Todo";

  if (!title) return { ok: false, error: "Title is required" };
  if (!content) return { ok: false, error: "Content is required" };

  try {
    await createNote({ title, content, tag });
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to create note" };
  }
}