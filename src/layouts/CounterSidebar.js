// import { NavLink, useParams } from "react-router-dom";
// import { useEffect, useState, useCallback } from "react";
// import API from "../config/api";

// function CounterSidebar() {
//   const { branchId } = useParams();
//     const role = localStorage.getItem("role");
  
//     // const [branch, setBranch] = useState({});
//   const [orders, setOrders] = useState(false);

//   const toggleOrders = () => {
//     setOrders(!orders);
//   };

// //   const fetchBranchDetails = useCallback(async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const response = await API.get(
// //         `/api/branches/${branchId}/branch`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setBranch(response.data.data);
// //     } catch (error) {
// //       console.error("Branch fetch error:", error);
// //     }
// //   }, [branchId]);

// //   useEffect(() => {
// //   if (!branchId || role === "COUNTER") return;

// //   fetchBranchDetails();
// // }, [branchId, role]);

//   return (
//     <div className="bg-white border-end text-dark vh-100 p-3" style={{ width: "260px" }}>
      
//       {/* BRANCH NAME */}
//      <h5 className="mb-4 fw-bold">
//             Counter Dashboard
//         </h5>

//       <div className="text-muted mb-4">
//         <h6>Counter Menu</h6>
//       </div>

//       <ul className="nav flex-column">

//         {/* DASHBOARD */}
//         <li className="nav-item mb-2">
//           <NavLink
//             to={`/branches/${branchId}/counter-dashboard`}
//             className="nav-link text-black"
//           >
//             Dashboard
//           </NavLink>
//         </li>

//         {/* SELL BOOK */}
//         <li className="nav-item mb-2">
//           <NavLink
//             to={`/branches/${branchId}/sell`}
//             className="nav-link text-black"
//           >
//             Sell Book / Add Order
//           </NavLink>
//         </li>

//         {/* ORDERS */}
//         <li className="nav-item mb-2">
//           <div
//             className="nav-link text-black"
//             style={{ cursor: "pointer" }}
//             onClick={toggleOrders}
//           >
//             Orders {orders ? "▲" : "▼"}
//           </div>

//           {orders && (
//             <ul className="nav flex-column ms-3">

//               <li className="nav-item">
//                 <NavLink
//                   to={`/branches/${branchId}/order-history`}
//                   className="nav-link text-black"
//                 >
//                   Order History
//                 </NavLink>
//               </li>

//             </ul>
//           )}
//         </li>

//       </ul>
//     </div>
//   );
// }

// export default CounterSidebar;


import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";


function CounterSidebar() {
  const { branchId } = useParams();
  const counterId = localStorage.getItem("counterId");
  const [orders, setOrders] = useState(false);

  const toggleOrders = () => {
    setOrders(!orders);
  };

  return (
    <div className="bg-white border-end text-dark vh-100 p-3" style={{ width: "260px" }}>
     
      <h5 className="mb-4 fw-bold">
        Counter Dashboard
      </h5>

      <div className="text-muted mb-4">
        <h6>Counter Menu</h6>
      </div>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink
            to={`/branches/${branchId}/counter-dashboard`}
            className="nav-link text-black"
          >
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to={`/branches/${branchId}/counter/${counterId}/sell`}
            className="nav-link text-black"
          >
            Sell Book / Add Order
          </NavLink>
        </li>

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
                  to={`/branches/${branchId}/counter/${counterId}/orders`}
                  className="nav-link text-black"
                >
                  Order History
                </NavLink>
              </li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
}

export default CounterSidebar;
