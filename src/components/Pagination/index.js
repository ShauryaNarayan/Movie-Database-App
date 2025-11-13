import React from 'react'
import './index.css'

const Pagination = ({currentPage, totalPages, onPageChange}) => (
  <div className="pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Prev
    </button>
    <span>{currentPage} </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
)

export default Pagination
