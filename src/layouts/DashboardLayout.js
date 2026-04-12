import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
import API from "../config/api";
// import CounterSidebar from "./CounterSidebar";
import Loader from "../components/Loader";
function DashboardLayout() {

  const role = localStorage.getItem("role");

  const { branchId } = useParams();

  const [schools, setSchools] = useState([]);
  const [books, setBooks] = useState([]);
  const [counters, setCounters] = useState([]);

  const [schoolsLoading, setSchoolsLoading] = useState(role !== "COUNTER");
  const [booksLoading, setBooksLoading] = useState(role !== "COUNTER");
  const [countersLoading, setCountersLoading] = useState(role !== "COUNTER");




  // =========Get School List====================

  // useEffect(() => {
  //   if (!branchId || role === "COUNTER") return;

  //   const fetchSchools = async () => {
  //     try {
  //       setSchoolsLoading(true);

  //       const token = localStorage.getItem("token");

  //       const resp = await API.get(`/api/branches/${branchId}/schools`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setSchools(resp.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setSchoolsLoading(false);
  //     }
  //   };

  //   fetchSchools();
  // }, [branchId, role]);

const fetchSchools = useCallback(async () => {
  if (!branchId || role === "COUNTER") return;

  try {
    setSchoolsLoading(true);

    const token = localStorage.getItem("token");

    const resp = await API.get(
      `/api/branches/${branchId}/schools`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSchools(resp.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setSchoolsLoading(false);
  }
}, [branchId, role]);

useEffect(() => {
  fetchSchools();
}, [fetchSchools, branchId, role]);

  // =========Get Books List===============

  const fetchBooks = useCallback(async () => {
    if (!branchId || role === "COUNTER") return;

    try {
      setBooksLoading(true);

      const token = localStorage.getItem("token");

      const resp = await API.get(`/api/branches/${branchId}/books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(resp.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setBooksLoading(false);
    }
  }, [branchId, role]);


  useEffect(() => {
    if (!branchId || role === "COUNTER") return;

    fetchBooks();
  }, [fetchBooks, branchId, role]);



  // ===========fetch counter list======================

  const fetchCounters = useCallback(async () => {
    if (!branchId || role === "COUNTER") return;

    try {
      setCountersLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get(`/api/branches/${branchId}/counters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounters(res.data?.data || res.data || []);

    } catch (error) {
      console.error("Fetch counters error:", error);
    } finally {
      setCountersLoading(false);
    }
  }, [branchId, role]);

  useEffect(() => {
    if (!branchId || role === "COUNTER") return;
    fetchCounters();
  }, [fetchCounters, branchId, role]);


  // ================== LOADER ==================
  const isLoading = booksLoading || schoolsLoading || countersLoading;



  // =======================Actions=========================
  // Add New School 

  const addSchool = async (schoolData) => {
    if (role === "COUNTER") return;
    try {
      const token = localStorage.getItem("token");

      console.log(schoolData);

      const res = await API.post("/api/schools/addSchool", schoolData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools((prev) => [...prev, res.data.data]);
    }
    catch (error) {
      console.error(error);
      alert("Failed to add School");
    }
  };

  // Update School

  const updateSchool = async (id, updatedSchool) => {
    if (role === "COUNTER") return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/api/schools/update/${id}`,
        updatedSchool,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools(prev =>
        prev.map(school =>
          school._id === id ? res.data : school
        )
      );

    } catch (error) {
      console.error(error);
      alert("Failed to update school");
    }
  };

  // Delete School
  const deleteSchool = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/schools/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from UI instantly
      setSchools(prev => prev.filter(s => s._id !== id));

    } catch (error) {
      console.error("Delete School Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete school");
    }
  };


  // Add New Book

  const addBooks = async (newBooks) => {
    if (role === "COUNTER") return;
    try {

      const token = localStorage.getItem("token");

      console.log(newBooks);

      const res = await API.post(`/api/books/addBooks`,
        newBooks,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setBooks((prev) => [...prev, res.data.data]);
    }
    catch (error) {
      console.error(error);
      alert("Failed to add Books");
    }
  };

  // const addBooks = (book) => {
  //     setBooks([...books, book]);
  // };


  // Update Book
  const updateBook = async (id, updatedBook) => {
    if (role === "COUNTER") return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/api/books/update/${id}`,
        updatedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(prev =>
        prev.map(book =>
          book._id === id ? res.data : book
        )
      );

    } catch (error) {
      console.error(error);
      alert("Failed to update book");
    }
  };

  // Delete Book
  const deleteBook = async (id) => {
    if (role === "COUNTER") return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from UI instantly
      setBooks(prev => prev.filter(book => book._id !== id));

    } catch (error) {
      console.error("Delete Book Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };




  // Add New Counter 

  const addCounter = async (counterData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        `/api/counters/addCounter`,
        {
          ...counterData,
          branchId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Only update if valid response
      if (res?.data) {
        setCounters(prev => [...prev, res.data]);
      }

      return { success: true };

    } catch (error) {
      console.error("Add Counter Error:", error.response?.data || error);

      return {
        success: false,
        message: error.response?.data?.message || "Failed to add Counter"
      };
    }
  };

  // Update Counter

  const updateCounter = async (id, counterData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/api/counters/update/${id}`,
        {
          ...counterData,
          branchId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update UI instantly
      setCounters(prev =>
        prev.map(c =>
          c._id === id ? res.data.data : c
        )
      );

      return { success: true };

    } catch (error) {
      console.error("Update Counter Error:", error.response?.data || error);

      return {
        success: false,
        message: error.response?.data?.message || "Update failed"
      };
    }
  };

  // Delete Counter

  const deleteCounter = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/counters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // remove from UI
      setCounters(prev => prev.filter(c => c._id !== id));

    } catch (error) {
      console.error("Delete Counter Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete counter");
    }
  };


  return (
    <>
      <div className="d-flex">
        <Sidebar />

        <div className="flex-grow-1">
          <Header />


          <div className="container-fluid px-4 py-3 bg-light" style={{ minHeight: "100vh" }}>
            {isLoading ? (
              <Loader text="Data Loading..." />
            )
              :
              (<Outlet context={{
                schools, addSchool, updateSchool, deleteSchool, fetchSchools,
                books, addBooks, updateBook, fetchBooks, deleteBook,
                counters, fetchCounters, addCounter, updateCounter, deleteCounter
              }} />
              )
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
