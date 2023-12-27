import React, { useState } from "react";
import { KeyboardEvent } from "react";
interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const visiblePageLimit = 5; // Number of visible pages
  const halfVisiblePageLimit = Math.floor(visiblePageLimit / 2);

  const startPage = Math.max(1, currentPage - halfVisiblePageLimit);
  const endPage = Math.min(totalPages, startPage + visiblePageLimit - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const [pageNumberInput, setPageNumberInput] = useState("");

  const handlePageNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageNumberInput(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageNumberInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };
  const handlePageNumberInputKeyPress = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  return (
    <nav aria-label="..." className="">
      <ul className=" m-0 pagination justify-content-center pagination-sm">
        {currentPage > 1 && (
          <button className="paginate btn-hover-custom bg-white p-0 m-0 border-0" onClick={() => onPageChange(currentPage - 1)}>
            <li className="page-item">
              <a className="page-link">Prev</a>
            </li>
          </button>
        )}

        {pages.map((page) => (
          <button className="paginate btn-hover-custom bg-white p-0 m-0 border-0" onClick={() => onPageChange(page)}>
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
              
            >
              <a className="page-link">{page}</a>
            </li>
          </button>
        ))}

        {currentPage < totalPages && (
            <button className="paginate btn-hover-custom bg-white p-0 m-0 border-0" onClick={() => onPageChange(currentPage + 1)}>
                  <li
            className="page-item"
           
          >
            <a className="page-link">Next</a>
          </li>
            </button>
        
        )}
      </ul>

      <div className="input-group mb-3 w-50  d-flex justify-content-center align-items-center  m-auto">
        <input
          type="number"
          className="form-control custom-input h-25 rounded"
          placeholder="Go to page"
          value={pageNumberInput}
          onChange={handlePageNumberInputChange}
          onKeyPress={handlePageNumberInputKeyPress} // Add this line
        />
        <div className="input-group-append m-2">
          <button
            className="btn btn-outline-secondary px-4"
            type="button"
            onClick={handleGoToPage}
          >
            Go
          </button>
        </div>
      </div>

      <p className="text-center">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
};

export default CustomPagination;
