import { useEffect, useState, useCallback, useMemo } from "react";
// import {  useState } from "react";
// import { useNavigate } from "react-router-dom";
import API from "../../../config/api";
import usePageTitle from "../../../hooks/usePageTitle";
import { useOutletContext, useParams } from "react-router-dom";

function SellBooks() {

  usePageTitle("Add Order");

  // const counterId = localStorage.getItem("counterId");
   const branchId = localStorage.getItem("branchId");
   const token = localStorage.getItem("token");

    const { counterId } = useParams();

  //  const navigate = useNavigate();

  
  const [selectedClass, setSelectedClass] = useState("");
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    mobileNo: "",
    className: "",
    // buyerType: "DIRECT",
    buyerType: counterId ? "DIRECT" : "SCHOOL",
    billingStatus: "PAID",
    paymentType: "Cash",
    utrNo: "",
    books: []
  });

    const { fetchCounters, schools } = useOutletContext();
    
  // Fetch Available Books
  // const fetchAvailableBooks = useCallback(async () => {
  //   try {
  //     const res = await API.get(`/api/orders/counter-books/${counterId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     setBooks(res.data || []);
  //   } catch (err) {
  //     console.error("Error fetching books", err);
  //   }
  //   }, [counterId, token]);


//     const fetchAvailableBooks = useCallback(async () => {
//   try {
//     let res;

//     if (counterId) {
//       // ✅ Counter stock
//       res = await API.get(`/api/orders/counter-books/${counterId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//     } else {
//       // ✅ Branch main stock (for school order)
//       res = await API.get(`/api/branches/${branchId}/books`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//     }

//     setBooks(res.data || res.data.data || []);
//   } catch (err) {
//     console.error("Error fetching books", err);
//   }
// }, [counterId, branchId, token]);

const fetchAvailableBooks = useCallback(async () => {
  try {
    let res;

    if (counterId) {
      res = await API.get(`/api/orders/counter-books/${counterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      res = await API.get(`/api/branches/${branchId}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    console.log("FULL RESPONSE:", res.data);

    const data = Array.isArray(res.data)
      ? res.data
      : res.data.data || res.data.books || [];

    setBooks(data);

  } catch (err) {
    console.error("Error fetching books", err);
    setBooks([]); // safety
  }
}, [counterId, branchId, token]);

      useEffect(() => {
        fetchAvailableBooks();
      }, [fetchAvailableBooks]);



      const classList = [...new Set(books.map(book => book.className))];

      useEffect(() => {
  console.log("Books Data:", books);
}, [books]);


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
        // bookId: book.bookId,
        // bookId: book._id,
        bookId: book.bookId || book._id, 
        bookName: book.bookName,
        sellPrice: book.sellPrice || book.price || 0,
        quantity: 1,
        availableQuantity: book.availableQuantity,
        selected: true
      }));

      console.log("Mapped Books:", classBooks);

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
      // await API.post("/api/orders/create",
      //  {
      //     counterId,
      //     studentName: form.studentName,
      //     fatherName: form.fatherName,
      //     mobileNo: form.mobileNo,
      //     className: form.className,
      //     buyerType: form.buyerType,
      //     books: selectedBooks,
      //     totalAmount,
      //     billingStatus: form.billingStatus,
      //     paymentType: form.paymentType,
      //     utrNo: form.utrNo
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // );
      // console.log("Before API call");

     

      await API.post(
  "/api/orders/create",
  {
    branchId,
    counterId: counterId || null,

    buyerType: counterId ? "DIRECT" : "SCHOOL",

    schoolId: !counterId ? form.schoolId : null,

    studentName: counterId ? form.studentName : null,
    fatherName: counterId ? form.fatherName : null,
    mobileNo: counterId ? form.mobileNo : null,

    className: form.className,
    books: selectedBooks,
    totalAmount,

    billingStatus: form.billingStatus,
    paymentType: form.paymentType,
    utrNo: form.paymentType !== "Cash" ? form.utrNo : null
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);
// console.log("After API call");

      alert("Order placed successfully ✅");

      // setForm({
      //   bookId: "",
      //   quantity: 1,
      //   studentName: "",
      //   className: "",
      //   buyerType: "DIRECT"
      // });

      
      await fetchAvailableBooks(); // Refresh Counter stock
      // console.log("Before fetchCounters");

      await fetchCounters(); 

      // console.log("After fetchCounters");

      // navigate(`/branches/${branchId}/counter-dashboard`);
      // navigate(`/branches/${branchId}/counter/${counterId}`);

    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="container mt-3">
      <h3>Sell Book</h3>

      <form onSubmit={handleSubmit} className="mb-4">

          {counterId && (
        <>
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
      </>
)}
        {/* Schools */}

        {!counterId && (
  <div className="mb-3">
    <label>Select School</label>
    <select
      name="schoolId"
      value={form.schoolId || ""}
      onChange={handleChange}
      className="form-control"
      required
    >
      <option value="">Select School</option>
      {schools?.map((s) => (
        <option key={s._id} value={s._id}>
          {s.schoolName}
        </option>
      ))}
    </select>
  </div>
)}

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
          {!counterId && (
          <div className="mt-3">
          <label>Buyer Type</label>
          <select
            name="buyerType"
            value={form.buyerType}
            onChange={handleChange}
            className="form-control"
          >
            {/* <option value="DIRECT">Direct</option> */}
            <option value="SCHOOL">School</option>
          </select>
        </div>
        )}
       
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

// import { useState } from "react";
// import { useParams, useOutletContext } from "react-router-dom";
// import API from "../config/api";

// function SellBooks() {

//   usePageTitle("Add Order");

//   const { branchId, counterId } = useParams();

//   const { schools, books } = useOutletContext(); // ✅ from DashboardLayout

//   const [form, setForm] = useState({
//     // buyerType: "DIRECT",
//     buyerType: counterId ? "DIRECT" : "SCHOOL",
//     schoolId: "",
//     studentName: "",
//     fatherName: "",
//     mobileNo: "",
//     className: "",
//     books: [],
//     paymentType: "CASH",
//     billingStatus: "PAID",
//     utrNo: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Add book row
//   const addBookRow = () => {
//     setForm({
//       ...form,
//       books: [...form.books, { bookId: "", quantity: 1 }]
//     });
//   };

//   // Handle book change
//   const handleBookChange = (index, field, value) => {
//     const updatedBooks = [...form.books];
//     updatedBooks[index][field] = value;
//     setForm({ ...form, books: updatedBooks });
//   };

//   // Submit Order
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       // const payload = {
//       //   ...form,
//       //   branchId,
//       //   counterId: form.buyerType === "DIRECT" ? localStorage.getItem("counterId") : null
//       // };

//       const payload = {
//   branchId,
//   buyerType: form.buyerType,

//   // 👇 Conditional fields
//   // counterId: form.buyerType === "DIRECT" ? localStorage.getItem("counterId") : null,
//    counterId: counterId || null,
//   schoolId: form.buyerType === "SCHOOL" ? form.schoolId : null,

//   studentName: form.buyerType === "DIRECT" ? form.studentName : null,
//   fatherName: form.buyerType === "DIRECT" ? form.fatherName : null,
//   mobileNo: form.buyerType === "DIRECT" ? form.mobileNo : null,
//   className: form.buyerType === "DIRECT" ? form.className : null,

//   books: form.books,
//   paymentType: form.paymentType,
//   billingStatus: form.billingStatus,
//   utrNo: form.paymentType === "ONLINE" ? form.utrNo : null
// };

//       await API.post("/api/orders/create", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       alert("Order Created Successfully ✅");

//       // Reset form
//       setForm({
//         buyerType: "DIRECT",
//         schoolId: "",
//         studentName: "",
//         fatherName: "",
//         mobileNo: "",
//         className: "",
//         books: [],
//         paymentType: "CASH",
//         billingStatus: "PAID",
//         utrNo: ""
//       });

//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Order failed");
//     }
//   };

//   return (
//     <div className="card p-4">
//       <h4>Create Order</h4>

//       <form onSubmit={handleSubmit}>

//         {/* Buyer Type */}
//         <div className="mb-3">
//           <label>Buyer Type</label>
//           <select
//             name="buyerType"
//             value={form.buyerType}
//             onChange={handleChange}
//             className="form-control"
//              disabled={!!counterId} 
//           >
//             <option value="DIRECT">Student (Counter)</option>
//             <option value="SCHOOL">School (Bulk)</option>
//           </select>
//         </div>

//         {/* School Dropdown */}
//         {form.buyerType === "SCHOOL" && (
//           <div className="mb-3">
//             <label>Select School</label>
//             <select
//               name="schoolId"
//               value={form.schoolId}
//               onChange={handleChange}
//               className="form-control"
//               required
//             >
//               <option value="">Select School</option>
//               {schools.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.schoolName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Student Fields */}
//         {form.buyerType === "DIRECT" && (
//           <>
//             <input
//               type="text"
//               name="studentName"
//               placeholder="Student Name"
//               className="form-control mb-2"
//               value={form.studentName}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="fatherName"
//               placeholder="Father Name"
//               className="form-control mb-2"
//               value={form.fatherName}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="mobileNo"
//               placeholder="Mobile No"
//               className="form-control mb-2"
//               value={form.mobileNo}
//               onChange={handleChange}
//             />
//             <input
//               type="text"
//               name="className"
//               placeholder="Class"
//               className="form-control mb-2"
//               value={form.className}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {/* Books Section */}
//         <div className="mb-3">
//           <button type="button" onClick={addBookRow} className="btn btn-primary">
//             Add Book
//           </button>

//           {form.books.map((item, index) => (
//             <div key={index} className="d-flex gap-2 mt-2">
//               <select
//                 value={item.bookId}
//                 onChange={(e) =>
//                   handleBookChange(index, "bookId", e.target.value)
//                 }
//                 className="form-control"
//                 required
//               >
//                 <option value="">Select Book</option>
//                 {books.map((b) => (
//                   <option key={b._id} value={b._id}>
//                     {b.bookName}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="number"
//                 value={item.quantity}
//                 min="1"
//                 onChange={(e) =>
//                   handleBookChange(index, "quantity", e.target.value)
//                 }
//                 className="form-control"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Payment */}
//         <select
//           name="paymentType"
//           value={form.paymentType}
//           onChange={handleChange}
//           className="form-control mb-2"
//         >
//           <option value="CASH">Cash</option>
//           <option value="ONLINE">Online</option>
//         </select>

//         {form.paymentType === "ONLINE" && (
//           <input
//             type="text"
//             name="utrNo"
//             placeholder="UTR No"
//             className="form-control mb-2"
//             value={form.utrNo}
//             onChange={handleChange}
//           />
//         )}

//         <button type="submit" className="btn btn-success mt-3">
//           Create Order
//         </button>
//       </form>
//     </div>
//   );
// }


export default SellBooks;
