import { useState } from "react";

import API from "../../../config/api";
import { useOutletContext } from "react-router-dom";
import usePageTitle from "../../../hooks/usePageTitle";




// function AssignStock() {

//   usePageTitle("Assign Stock");

//   const { branchId } = useParams();

//   // const [counters, setCounters] = useState([]);
//   // const [books, setBooks] = useState([]);

//   const [form, setForm] = useState({
//     counterId: "",
//     bookId: "",
//     quantity: ""
//   });
//   const { counters, books, fetchBooks } = useOutletContext();

//     // const { fetchBooks: refreshMainBooks } = useOutletContext();

//   // Fetch Counters
//   // const fetchCounters = useCallback(async () => {
//   //   try {
//   //     const res = await API.get(`/api/branches/${branchId}/counters`, {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`
//   //       }
//   //     });

//   //     console.log("Counters:", res.data);

//   //      setCounters(res.data.data || res.data || []);

//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // }, [branchId]);

//   // Fetch Books (Branch Stock)
//   // const fetchBooks = useCallback(async () => {
//   //   try {
//   //     const res = await API.get(`/api/branches/${branchId}/books`, {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`
//   //       }
//   //     });
//   //      console.log("Books:", res.data);

//   //   setBooks(res.data.data || res.data || []);

//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // }, [branchId]);

//   // useEffect(() => {
//   //   fetchCounters();
//   //   fetchBooks();
//   // }, [fetchCounters, fetchBooks]);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/api/counter-stock/assign",
//         {
//           branchId,
//           ...form,
//           quantity: Number(form.quantity)
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );

//       alert("Stock Assigned Successfully ✅");

//       setForm({
//         counterId: "",
//         bookId: "",
//         quantity: ""
//       });

//       // await refreshMainBooks();   // 🔥 update BooksList globally
//       await fetchBooks();               // refresh dropdown list here

//     } catch (err) {
//       alert(err.response?.data?.message || "Assignment Failed");
//     }
//   };

//   return (
//     <div className="card">
//     <div className="card-header fw-bold">
//       <h3>Assign Stock to Counter</h3>

//       <div className="card-body">
//       <form onSubmit={handleSubmit}>

//         <div className="mb-2">
//           <label>Select Counter</label>
//           <select
//             name="counterId"
//             value={form.counterId}
//             onChange={handleChange}
//             required
//             className="form-control"
//           >
//             <option value="">Select Counter</option>
//             {counters.map(c => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-2">
//           <label>Select Book</label>
//           <select
//             name="bookId"
//             value={form.bookId}
//             onChange={handleChange}
//             required
//             className="form-control"
//           >
//             <option value="">Select Book</option>
//             {books.map(b => (
//               <option key={b._id} value={b._id}>
//                 {b.bookName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-2">
//           <label>Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={form.quantity}
//             onChange={handleChange}
//             required
//             className="form-control"
//             min="1"
//           />
//         </div>

//         <button className="btn btn-primary">
//           Assign Stock
//         </button>

//       </form>
//       </div>
//     </div>
//     </div>
//   );
// }



function AssignStock() {

  usePageTitle("Assign Stock");

  // const [schools, setSchools] = useState([]);
  // const [counters, setCounters] = useState([]);
  // const [classes, setClasses] = useState([]);
  // const [books, setBooks] = useState([]);

  const [selectedBooks, setSelectedBooks] = useState([]);

  const { schools, counters, books, fetchBooks, fetchCounters } = useOutletContext();

  const [form, setForm] = useState({
    schoolId: "",
    counterId: "",
    className: ""
  });


  const filteredCounters = counters.filter(
    c => c.schoolId?._id === form.schoolId || c.schoolId === form.schoolId
  );

  const classes = [...new Set(books.map(b => b.className))];

  // When class selected load books
  // const fetchBooks = async (className) => {

  //   const res = await API.get(`/api/books/class/${className}`);
  //   setBooks(res.data);

  // }

  const filteredBooks = books.filter(
    b => b.className === form.className
  );


  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "schoolId") {
      setForm({
        schoolId: value,
        counterId: "",
        className: ""
      });

      setSelectedBooks([]);

    } else if (name === "className") {

      setForm(prev => ({
        ...prev,
        className: value
      }));

      setSelectedBooks([]);

    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  // select book
  const toggleBook = (book) => {

    const exist = selectedBooks.find(b => b.bookId === book._id);

    if (exist) {
      setSelectedBooks(selectedBooks.filter(b => b.bookId !== book._id));
    } else {
      setSelectedBooks([
        ...selectedBooks,
        { bookId: book._id, bookName: book.bookName, quantity: 1 }
      ]);
    }

  }


  // quantity change
  const changeQty = (bookId, qty) => {

    const book = books.find(b => b._id === bookId);

    if (qty > book.quantity) {
      alert("Quantity cannot be greater than available stock");
      return;
    }

    setSelectedBooks(
      selectedBooks.map(b =>
        b.bookId === bookId ? { ...b, quantity: Number(qty) } : b
      )
    );

  }


  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.counterId) {
      alert("Please select counter");
      return;
    }

    if (selectedBooks.length === 0) {
      alert("Please select at least one book");
      return;
    }

    try {

      await API.post("/api/counter-stock/assign", {
        counterId: form.counterId,
        books: selectedBooks
      },
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
    );

      alert("Stock Assigned Successfully");

      setSelectedBooks([]);

      await fetchBooks(); // re-fresh main branch stock
      await fetchCounters();  // fectch counter to update available stock
    } catch (err) {
      alert(err.response?.data?.message || "Assignment failed");
    }
  };


  return (

    <div className="card">
      <div className="card-header">
        <h3>Assign Stock</h3>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* SCHOOL */}

          <label>School</label>
          <select name="schoolId" onChange={handleChange} className="form-control">

            <option>Select School</option>

            {schools.map(s => (
              <option key={s._id} value={s._id}>{s.schoolName}</option>
            ))}

          </select>


          {/* COUNTER */}

          <label className="mt-2">Counter</label>
          <select name="counterId" onChange={handleChange} className="form-control">

            <option>Select Counter</option>

            {filteredCounters.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}

          </select>


          {/* CLASS */}

          <label className="mt-2">Class</label>
          <select name="className" onChange={handleChange} className="form-control">

            <option>Select Class</option>

            {classes.map(c => (
              <option key={c}>{c}</option>
            ))}

          </select>


          {/* BOOK LIST */}

          <h5 className="mt-3">Select Books</h5>

          {filteredBooks.map(book => {

            const selected = selectedBooks.find(b => b.bookId === book._id);

            return (

              <div key={book._id} className="d-flex align-items-center mb-2">

                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={() => toggleBook(book)}
                />

                <span className="ms-2">
                  {book.bookName} (Stock : {book.quantity})
                </span>

                {selected && (

                  <input
                    type="number"
                    value={selected.quantity}
                    onChange={(e) => changeQty(book._id, e.target.value)}
                    className="form-control ms-3"
                    style={{ width: "100px" }}
                  />

                )}

              </div>

            )

          })}


          <button
            className="btn btn-primary mt-3"
            disabled={selectedBooks.length === 0}
          >
            Assign Stock
          </button>
        </form>

      </div>
    </div>

  )

}

export default AssignStock;
