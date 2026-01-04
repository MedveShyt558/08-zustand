"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  useEffect(() => {
    if (!draft) {
      setDraft({ title: "", content: "", tag: "Todo" });
    }
  }, [draft, setDraft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const tag = String(formData.get("tag") ?? "Todo") as NoteTag;

    await mutation.mutateAsync({ title, content, tag });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        className={css.input}
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <textarea
        className={css.textarea}
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />

      <select className={css.select} name="tag" value={draft.tag} onChange={handleChange}>
        {tags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className={css.actions}>
        <button type="submit" className={css.submit} disabled={mutation.isPending}>
          Create
        </button>

        <button type="button" className={css.cancel} onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
