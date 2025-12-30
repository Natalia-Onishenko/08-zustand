
import Link from "next/link";
import styles from "../@sidebar/SidebarNotes.module.css";
import type { NoteTag } from "../../../../types/note";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Sidebar() {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link className={styles.menuLink} href="/notes/filter/all">
            All notes
          </Link>
        </li>

        {tags.map((tag) => (
          <li key={tag} className={styles.menuItem}>
            <Link className={styles.menuLink} href={`/notes/filter/${tag}`}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
