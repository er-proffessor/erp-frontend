import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import API from "../config/api";

function Sidebar() {
  const { branchId } = useParams();
  // const counterId = localStorage.getItem("counterId");

  const [school, setSchool] = useState(false);
  const [books, setBooks] = useState(false);
  // const [stockAssign, setStockAssign] = useState(false);
  const [counter, setCounter] = useState(false);

  const toggleSchool = () => {
  setSchool(!school);
  // setOrders(false);
  setBooks(false);
  setCounter(false);
};

const toggleBooks = () => {
  setBooks(!books);
  setSchool(false);
  // setOrders(false);
  setCounter(false);
};
const toggleCounter = () => {
  setCounter(!counter);
  setBooks(false);
  setSchool(false);
  // setOrders(false);
};


  const [branch, setBranch] = useState({});

  const fetchBranchDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/api/branches/${branchId}/branch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBranch(response.data.data);
    } catch (error) {
      console.error("Branch fetch error:", error);
    }
  }, [branchId]);

  useEffect(() => {
    if (branchId) {
      fetchBranchDetails();
    }
  }, [branchId, fetchBranchDetails]);



  return (
    <div className="bg-white boder-end text-dark vh-100 p-3" style={{ width: "260px" }}>
      <h5 className="mb-4 fw-bold">{branch.branchName
            ? `${branch.branchName}`
            : "Dashboard"}</h5>
      <div className="text-muted mb-4">
        <h6>Dashboar Menu</h6>
      </div>
      <ul className="nav flex-column">

        {/* DASHBOARD */}
        <li className="nav-item mb-2">
          <NavLink
            to={`/branches/${branchId}`}
            className="nav-link text-black"
          >
            Dashboard
          </NavLink>
        </li>

        {/* SCHOOL (WITH DROPDOWN) */}
        <li className="nav-item mb-2">
          <div
            className="nav-link text-black"
            style={{ cursor: "pointer" }}
            onClick={toggleSchool}
          >
            School {school ? "▲" : "▼"}
          </div>

          {school && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/schools`}
                  className="nav-link text-black"
                >
                  School List
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/schools/add`}
                  className="nav-link text-black"
                >
                  Add School
                </NavLink>
              </li>
            </ul>
          )}
        </li>

          {/* Books (WITH DROPDOWN) */}
        <li className="nav-item mb-2">
          <div
            className="nav-link text-black"
            style={{ cursor: "pointer" }}
            onClick={toggleBooks}
          >
            Books {books ? "▲" : "▼"}
          </div>

          {books && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/books`}
                  className="nav-link text-black"
                >
                  Books List
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/books/add`}
                  className="nav-link text-black"
                >
                  Add Books
                </NavLink>
              </li>
            </ul>
          )}
        </li>


        {/* Orders (WITH DROPDOWN)
        <li className="nav-item mb-2">
          <div
            className="nav-link text-black"
            style={{ cursor: "pointer" }}
            onClick={toggleOrders}
          >
            Orders {orders ? "▲" : "▼"}
          </div>

          {orders && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink
                  to={counterId ? `/counter/${counterId}/orders` : "#"}
                  className="nav-link text-black"
                >
                  Orders List
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={counterId ? `/counter/${counterId}/sell` : "#"}
                  className="nav-link text-black"
                >
                  Add Orders
                </NavLink>
              </li>
            </ul>
          )}
        </li> */}

          

        {/* Counter (WITH DROPDOWN) */}
        <li className="nav-item mb-2">
          <div
            className="nav-link text-black"
            style={{ cursor: "pointer" }}
            onClick={toggleCounter}
          >
            Counters {counter ? "▲" : "▼"}
          </div>

          {counter && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/counters`}
                  className="nav-link text-black"
                >
                  Counters List
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/counters/add`}
                  className="nav-link text-black"
                >
                  Add Counter
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/branches/${branchId}/counter-stock/assign`}
                  className="nav-link text-black"
                >
                  Assign Books to Counter
                </NavLink>
              </li>
            </ul>
          )}
        </li>

   
        {/* INVENTORY */}
        <li className="nav-item">
          <NavLink
            to={`/branches/${branchId}`}
            className="nav-link text-black"
          >
            Inventory / Stocks
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
