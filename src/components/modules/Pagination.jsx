import React, { useState } from "react";
import styles from "./pagination.module.css";

function Pagination({ page, setPage }) {
  const perviousHandler = () => {
    page > 1 && setPage((page) => page - 1);
  };
  const nextHandler = () => {
    page < 10 && setPage((page) => page + 1);
  };
  return (
    <div className={styles.pagination}>
      <button
        onClick={perviousHandler}
        className={page === 1 ? styles.disabled : null}
      >
        pervious
      </button>
      <p className={page === 1 ? styles.selected : null}>1</p>
      <p className={page === 2 ? styles.selected : null}>2</p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={page === page ? styles.selected : null}>{page}</p>
        </>
      )}
      <span>...</span>
      <p className={page === 9 ? styles.selected : null}>9</p>
      <p className={page === 10 ? styles.selected : null}>10</p>
      <button
        className={page === 10 ? styles.disabled : null}
        onClick={nextHandler}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
