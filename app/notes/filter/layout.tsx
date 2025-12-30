// app/notes/filter/layout.tsx
import styles from "./LayoutNotes.module.css";

export default function FilterLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}