"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  useEffect(() => {
    if (!draft) {
      setDraft({
        title: "",
        content: "",
        tag: "Todo",
      });
    }
  }, [draft, setDraft]);

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;

    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content, tag }),
    });

    clearDraft();
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      <select
        className={css.select}
        name="tag"
        value={draft.tag}
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Idea">Idea</option>
      </select>

      <div className={css.actions}>
        <button type="submit" className={css.submit}>
          Create
        </button>
        <button type="button" onClick={() => router.back()} className={css.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
