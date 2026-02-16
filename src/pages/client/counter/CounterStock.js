import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../../../config/api";

function CounterStock() {
  const { counterId } = useParams();
  const [stock, setStock] = useState([]);

  

  const fetchStock = useCallback(async () => {
    try {
      const res = await API.get(
        `/api/counter-stock/counter/${counterId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      setStock(res.data);
    
    } 
    catch (err) {
      console.error(err);
    }
  },
    [counterId]);

    useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  return (
    <div>
      <h2>Counter Stock</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Book</th>
            <th>Price</th>
            <th>Assigned Qty</th>
          </tr>
        </thead>
        <tbody>
            {
                stock.length === 0 ? (
                    <tr>
                        <td colSpan="3">No Stock Assigned</td>
                    </tr>
                )
                :
                (stock.map((item) => (
            <tr key={item._id}>
              <td>{item.bookId?.name}</td>
              <td>{item.bookId?.price}</td>
              <td>{item.quantity}</td>
            </tr>
          )))
        }

        </tbody>
      </table>
    </div>
  );
}


export default CounterStock;
