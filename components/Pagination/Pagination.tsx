"use client";

import type { FC } from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      previousLabel="Prev"
      nextLabel="Next"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;