import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../config/api";

function CounterDashboard() {

  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

  const counterId = localStorage.getItem("counterId");

  const branchId = localStorage.getItem("branchId");

  useEffect(() => {
  const fetchStock = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/api/orders/counter-books/${counterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setStock(res.data);
    
    } catch (err) {
      console.error("Stock fetch error", err);
    }
  };

  
    if(counterId){
      fetchStock();
    }
  }, [counterId]);

  return (
    <div className="container mt-4">

      <h3>Counter Dashboard</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate(`/branches/${branchId}/counter/${counterId}/sell`)}
      >
        Sell Book
      </button>

      <button
        className="btn btn-warning mb-3 ms-2"
        onClick={() => navigate(`/branches/${branchId}/counter/${counterId}/orders`)}
      >
        Order History
      </button>

      <h5>Available Stock</h5>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Price</th>
            <th>Available Qty</th>
          </tr>
        </thead>
        <tbody>
          {stock.length === 0 ? (
            <tr>
              <td colSpan="3">No Stock Available</td>
            </tr>
          ) : (
            stock.map((item) => (
              <tr key={item.stockId}>
                 <td>{item.bookName}</td>
                <td>{item.price}</td>
                <td>{item.availableQuantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

export default CounterDashboard;
