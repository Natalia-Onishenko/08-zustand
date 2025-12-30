"use client";

import type { FC, ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes..."
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchBox;