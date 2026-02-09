import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardLayout() {
  const [schools, setSchools] = useState([]);
  

  const {branchId} = useParams();
  const [schoolsLoading, setSchoolsLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  

    // const addSchool = (school) => {
    //     setSchools([...schools, school]);
    // };

  useEffect(() => {
  if (!branchId) return;

  const fetchSchools = async () => {
    try {
      setSchoolsLoading(true);

      const token = localStorage.getItem("token");

      const resp = await axios.get(
        `http://localhost:5000/api/branches/${branchId}/schools`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchools(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSchoolsLoading(false);
    }
  };

  fetchSchools();
}, [branchId]);

  // Add New School 

  const addSchool = async (schoolData) => {
    try{
      const token = localStorage.getItem("token");

      console.log(schoolData);

      const res = await axios.post("http://localhost:5000/api/schools/addSchool", schoolData,
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

    useEffect(()=>{
      if (!branchId) return;

      const token = localStorage.getItem("token");

    axios.get(`http://localhost:5000/api/branches/${branchId}/books`, 
      {
         headers: {
                    Authorization: `Bearer ${token}`,
                  },
      }

    )
    .then((resp)=>{
      setBooks(resp.data.data);

      console.log(resp.data.data);

      setBooksLoading(false);
    })
    .catch((error)=>{
      console.error(error);
      setBooksLoading(false);
    });
  },[branchId]);

  
  // Add New Book

  const addBooks = async (newBooks) => {
    try{

      const token = localStorage.getItem("token");

        console.log(newBooks);

      const res = await axios.post(`http://localhost:5000/api/books/addBooks`,
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
      <Sidebar />

      <div className="flex-grow-1">
        <Header />
        {(booksLoading || schoolsLoading) ? (
          <div className="text-center mt-5">Loading....</div>
        )
        :
         (
         <div className="container-fluid px-4 py-3 bg-light" style={{ minHeight: "100vh" }}>
            <Outlet context={{schools, addSchool, books, addBooks}} />         
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default DashboardLayout;
