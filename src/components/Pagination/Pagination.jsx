import React from "react";
import "./Pagination.css";

function getPageRange(current, total) {
  const pages = new Set([1, total]);
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) pages.add(i);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push(null);
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);

  const handleChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="pagination" aria-label="Cocktail list pages">
      <button
        className="pagination-btn pagination-arrow"
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((page, i) =>
        page === null ? (
          <span key={`ellipsis-${i}`} className="pagination-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={page}
            className={`pagination-btn${page === currentPage ? " active" : ""}`}
            onClick={() => handleChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination-btn pagination-arrow"
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
