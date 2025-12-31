import type { Metadata } from "next";
import Link from "next/link";

import css from "./HomePage.module.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "404 — Page not found | NoteHub",
  description: "The page you are looking for does not exist in NoteHub.",
  openGraph: {
    title: "404 — Page not found | NoteHub",
    description: "The page you are looking for does not exist in NoteHub.",
    url: `${siteUrl}/404`,
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

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <p className={css.description}>
        <Link href="/">Go to Home</Link>
      </p>
    </div>
  );
}