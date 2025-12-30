"use client";

import type { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote, type CreateNoteDto } from "../../lib/api";
import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object<CreateNoteDto>({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.mixed<NoteTag>().oneOf(tags).required("Tag is required"),
});

const NoteForm: FC<NoteFormProps> = ({ onCancel }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  return (
    <Formik<CreateNoteDto>
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isValid }) => (
        <Form className={css.form}>
          <Field className={css.input} name="title" placeholder="Note title" />
          <ErrorMessage name="title" component="p" className={css.error} />

          <Field
            as="textarea"
            className={css.textarea}
            name="content"
            placeholder="Note content"
          />
          <ErrorMessage name="content" component="p" className={css.error} />

          <Field as="select" className={css.select} name="tag">
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="p" className={css.error} />

          <div className={css.actions}>
            <button
              className={css.submitButton}
              type="submit"
              disabled={!isValid || mutation.isPending}
            >
              Create note
            </button>

            <button
              className={css.cancelButton}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;