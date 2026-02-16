import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../config/api";

function SellBooks() {
  const counterId = localStorage.getItem("counterId");
   const branchId = localStorage.getItem("branchId");

  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    bookId: "",
    quantity: 1,
    studentName: "",
    className: "",
    buyerType: "DIRECT"
  });

    const navigate = useNavigate();

  // Fetch Available Books
  const fetchAvailableBooks = useCallback(async () => {
    try {
      const res = await API.get(`/api/orders/counter-books/${counterId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  }, [counterId]);

  useEffect(() => {
    fetchAvailableBooks();
  }, [fetchAvailableBooks]);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/orders/create",
        {
          counterId,
          ...form,
          quantity: Number(form.quantity)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Order placed successfully ✅");

      setForm({
        bookId: "",
        quantity: 1,
        studentName: "",
        className: "",
        buyerType: "DIRECT"
      });

      
      fetchAvailableBooks(); // Refresh Counter stock

      navigate(`/branches/${branchId}/counter-dashboard`);

    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="container mt-3">
      <h3>Sell Book</h3>

      <form onSubmit={handleSubmit} className="mb-4">

        <div className="mb-2">
          <label>Book</label>
          <select
            name="bookId"
            value={form.bookId}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select Book</option>
            {books.map(book => (
              <option key={book.bookId} value={book.bookId}>
                {book.bookName} (Available: {book.availableQuantity})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="form-control"
            min="1"
            required
          />
        </div>

        <div className="mb-2">
          <label>Student Name</label>
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Class</label>
          <input
            type="text"
            name="className"
            value={form.className}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Buyer Type</label>
          <select
            name="buyerType"
            value={form.buyerType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="DIRECT">Direct</option>
            <option value="SCHOOL">School</option>
          </select>
        </div>

        <button className="btn btn-success">
          Place Order
        </button>

      </form>
    </div>
  );
}

export default SellBooks;
