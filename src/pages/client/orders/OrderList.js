import { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
import API from "../../../config/api";

function OrderList() {
  const counterId = localStorage.getItem("counterId");

  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await API.get(`/api/orders/history/${counterId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setOrders(res.data);

    } catch (err) {
      console.error(err);
    }
  }, [counterId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container mt-3">
      <h3>Order History</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Book</th>
            <th>Student</th>
            <th>Class</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map(order =>
              order.books.map((bookItem, index) => (
                <tr key={order._id + index}>
                  <td>{bookItem.bookId?.bookName || "-"}</td>
                  <td>{order.studentName || "-"}</td>
                  <td>{order.className || "-"}</td>
                  <td>{bookItem.quantity}</td>
                  <td>₹ {bookItem.price}</td>
                  <td>₹ {bookItem.total}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
