import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../config/api";
import usePageTitle from "../../../hooks/usePageTitle";

function SellBooks() {

  usePageTitle("Add Order");

  const counterId = localStorage.getItem("counterId");
   const branchId = localStorage.getItem("branchId");
   const token = localStorage.getItem("token");

   const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState("");
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    mobileNo: "",
    className: "",
    buyerType: "DIRECT",
    billingStatus: "PAID",
    paymentType: "Cash",
    utrNo: "",
    books: []
  });

    

  // Fetch Available Books
  const fetchAvailableBooks = useCallback(async () => {
    try {
      const res = await API.get(`/api/orders/counter-books/${counterId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBooks(res.data || []);
    } catch (err) {
      console.error("Error fetching books", err);
    }
    }, [counterId, token]);

      useEffect(() => {
        fetchAvailableBooks();
      }, [fetchAvailableBooks]);

      const classList = [...new Set(books.map(book => book.className))];


      // const filteredBooks = selectedClass
      // ? books.filter(book => book.className === selectedClass)
      // : [];

      // Handle student field changes
  

  // Handle Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

// When class selected → auto load all books of that class
  const handleClassChange = (e) => {
    const cls = e.target.value;
    setSelectedClass(cls);

    const classBooks = books
      .filter(book => book.className === cls)
      .map(book => ({
        bookId: book.bookId,
        bookName: book.bookName,
        sellPrice: book.sellPrice || book.price || 0,
        quantity: 1,
        availableQuantity: book.availableQuantity,
        selected: true
      }));

    setForm(prev => ({
      ...prev,
      className: cls,
      books: classBooks
    }));
  };

  // Update book row
  const updateBookField = (index, field, value) => {
    const updated = [...form.books];
    updated[index][field] = value;
    setForm({ ...form, books: updated });
  };

  // Calculate total
  const totalAmount = useMemo(() => {
    return form.books
      .filter(b => b.selected)
      .reduce((sum, b) => sum + b.sellPrice * b.quantity, 0);
  }, [form.books]);

  // Submit Order
  const handleSubmit = async (e) => {
    e.preventDefault();

       const selectedBooks = form.books
      .filter(b => b.selected)
      .map(b => ({
        bookId: b.bookId,
        quantity: b.quantity,
        sellPrice: b.sellPrice
      }));

    if (selectedBooks.length === 0) {
      alert("Please select at least one book");
      return;
    }
    try {
      await API.post("/api/orders/create",
       {
          counterId,
          studentName: form.studentName,
          fatherName: form.fatherName,
          mobileNo: form.mobileNo,
          className: form.className,
          buyerType: form.buyerType,
          books: selectedBooks,
          totalAmount,
          billingStatus: form.billingStatus,
          paymentType: form.paymentType,
          utrNo: form.utrNo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order placed successfully ✅");

      // setForm({
      //   bookId: "",
      //   quantity: 1,
      //   studentName: "",
      //   className: "",
      //   buyerType: "DIRECT"
      // });

      
      // fetchAvailableBooks(); // Refresh Counter stock

      navigate(`/branches/${branchId}/counter-dashboard`);
      // navigate(`/branches/${branchId}/counter/${counterId}`);

    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="container mt-3">
      <h3>Sell Book</h3>

      <form onSubmit={handleSubmit} className="mb-4">

          {/* Student Info */}
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
          <label>Father Name</label>
          <input
            type="text"
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label>Mobile No</label>
          <input
            type="text"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

          {/* Class Select */}
          <div className="mb-3">
          <label>Select Class</label>
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="form-control"
            required
          >
            <option value="">Select Class</option>
            {classList.map(cls => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

       {/* Books Table */}
        {form.books.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Book</th>
                  <th>Sell Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {form.books.map((book, index) => (
                  <tr key={book.bookId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={book.selected}
                        onChange={(e) =>
                          updateBookField(index, "selected", e.target.checked)
                        }
                      />
                    </td>

                    <td>{book.bookName}</td>

                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={book.sellPrice}
                        min="0"
                        onChange={(e) =>
                          updateBookField(index, "sellPrice", Number(e.target.value))
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={book.quantity}
                        min="1"
                        max={book.availableQuantity}
                        onChange={(e) =>
                          updateBookField(index, "quantity", Number(e.target.value))
                        }
                      />
                    </td>

                    <td>₹ {book.sellPrice * book.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Total */}
        {form.books.length > 0 && (
          <h5 className="mt-3">Total Amount: ₹ {totalAmount}</h5>
        )}


        {/* <div className="mb-2">
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
          <label>Class</label>
          <input
            type="text"
            name="className"
            value={form.className}
            onChange={handleChange}
            className="form-control"
          />
        </div> */}

          <div className="mt-3">
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
       
        {/* Billing Status */}
          <div className="mt-3">
            <label>Billing Status</label>
            <select
              name="billingStatus"
              value={form.billingStatus}
              onChange={handleChange}
              className="form-control"
            >
              <option value="PAID">Paid</option>
              <option value="DUE">Due</option>
            </select>
          </div>

          {/* Payment Type */}
          <div className="mt-3">
            <label>Payment Type</label>
            <select
              name="paymentType"
              value={form.paymentType}
              onChange={handleChange}
              className="form-control"
            >
              <option value="Cash">Cash</option>
              <option value="PhonePe">PhonePe</option>
              <option value="GooglePay">Google Pay</option>
              <option value="Paytm">Paytm</option>
              <option value="NetBanking">Net Banking</option>
            </select>
          </div>

          {/* UTR Number */}
          {form.paymentType !== "Cash" && (
          <div className="mt-3">
            <label>UTR No.</label>
            <input
              type="text"
              name="utrNo"
              value={form.utrNo}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter UTR / Transaction Id"
            />
          </div>
          )}
          
        <button className="btn btn-success mt-3">
          Place Order
        </button>

      </form>
    </div>
  );
}

export default SellBooks;
