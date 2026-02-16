import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
import API from "../config/api";
import CounterSidebar from "./CounterSidebar";

function DashboardLayout() {
  
  const role = localStorage.getItem("role");

  const {branchId} = useParams();
  const [schoolsLoading, setSchoolsLoading] = useState(role !== "COUNTER");
  const [booksLoading, setBooksLoading] = useState(role !== "COUNTER");



  // Get School List

    const [schools, setSchools] = useState([]);
    
  useEffect(() => {
  if (!branchId || role === "COUNTER") return;

  const fetchSchools = async () => {
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
  };

  fetchSchools();
}, [branchId, role]);

  // Add New School 

  const addSchool = async (schoolData) => {
    if(role === "COUNTER") return;
    try{
      const token = localStorage.getItem("token");

      console.log(schoolData);

      const res = await API.post("/api/schools/addSchool", schoolData,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

        setSchools((prev) => [...prev, res.data.data]);
    }
    catch(error){
      console.error(error);
      alert("Failed to add School");
    }
  };

  // Get Books List

    const [books, setBooks] = useState([]);


  const fetchBooks = useCallback(async () => {
    if(role === "COUNTER") return;

    try {
      setBooksLoading(true);

      const token = localStorage.getItem("token");

      const resp = await API.get(
        `/api/branches/${branchId}/books`,
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
  
  // Add New Book

  const addBooks = async (newBooks) => {
     if(role === "COUNTER") return;
    try{

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
    catch(error){
      console.error(error);
      alert("Failed to add Books");
    }
  };

    // const addBooks = (book) => {
    //     setBooks([...books, book]);
    // };

  return (
    <>
    <div className="d-flex">
      {/* <Sidebar /> */}

      {/* {role !== "COUNTER" && <Sidebar />} */}

      {role === "COUNTER" ? <CounterSidebar /> : <Sidebar />}

      <div className="flex-grow-1">
        <Header />
        {(booksLoading || schoolsLoading) ? (
          <div className="text-center mt-5">Loading....</div>
        )
        :
         (
         <div className="container-fluid px-4 py-3 bg-light" style={{ minHeight: "100vh" }}>
            <Outlet context={{schools, addSchool, books, addBooks, fetchBooks}} />         
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default DashboardLayout;
