import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/api";
import { useOutletContext } from "react-router-dom";

function AssignStock() {
  const { branchId } = useParams();

  const [counters, setCounters] = useState([]);
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    counterId: "",
    bookId: "",
    quantity: ""
  });

    const { fetchBooks: refreshMainBooks } = useOutletContext();

  // Fetch Counters
  const fetchCounters = useCallback(async () => {
    try {
      const res = await API.get(`/api/branches/${branchId}/counters`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      console.log("Counters:", res.data);

       setCounters(res.data.data || res.data || []);

    } catch (err) {
      console.error(err);
    }
  }, [branchId]);

  // Fetch Books (Branch Stock)
  const fetchBooks = useCallback(async () => {
    try {
      const res = await API.get(`/api/branches/${branchId}/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
       console.log("Books:", res.data);

    setBooks(res.data.data || res.data || []);

    } catch (err) {
      console.error(err);
    }
  }, [branchId]);

  useEffect(() => {
    fetchCounters();
    fetchBooks();
  }, [fetchCounters, fetchBooks]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/counter-stock/assign",
        {
          branchId,
          ...form,
          quantity: Number(form.quantity)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Stock Assigned Successfully ✅");

      setForm({
        counterId: "",
        bookId: "",
        quantity: ""
      });

      await refreshMainBooks();   // 🔥 update BooksList globally
      await fetchBooks();               // refresh dropdown list here

    } catch (err) {
      alert(err.response?.data?.message || "Assignment Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Assign Stock to Counter</h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-2">
          <label>Select Counter</label>
          <select
            name="counterId"
            value={form.counterId}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select Counter</option>
            {counters.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Select Book</label>
          <select
            name="bookId"
            value={form.bookId}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select Book</option>
            {books.map(b => (
              <option key={b._id} value={b._id}>
                {b.bookName}
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
            required
            className="form-control"
            min="1"
          />
        </div>

        <button className="btn btn-primary">
          Assign Stock
        </button>

      </form>
    </div>
  );
}

export default AssignStock;
