import { NavLink, useParams } from "react-router-dom";
// import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function BooksList() {
  const { branchId } = useParams();
  const {books} = useOutletContext();

  console.log("Books from outlet:", books);

  return (
    <div className="container-fluid">

      <div className="card-header d-flex justify-content-between">
        <h5>Books List</h5>
        <NavLink to={`/branches/${branchId}/books/add`} className="btn btn-primary btn-sm">
          + Add Book
        </NavLink>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Books Name</th>
                <th>Publisher Name</th>
                <th>Class Name</th>
                <th>Subject</th>
                <th>MRP</th>
                <th>Purchase Price</th>
                <th>Sell Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No Books Added
                  </td>
                </tr>
              ) : (
                books.map((book, index) => (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td>{book.bookName}</td>
                    <td>{book.publisherName}</td>
                    <td>{book.className}</td>
                    <td>{book.subject}</td>
                    <td>{book.mrp}</td>
                    <td>{book.purchasePrice}</td>
                    <td>{book.sellPrice}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        ✏️
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BooksList;
