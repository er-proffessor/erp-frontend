import { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
import API from "../../../config/api";
import { FaDownload } from "react-icons/fa";

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

  const downloadInvoice = async (orderId) => {
    try {
      const response = await API.get(
        `/api/orders/invoice/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading invoice", err);
    }
  };

  return (
    <div className="container mt-3">
      <h3>Order History</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Books</th>
            <th>Student</th>
            <th>Class</th>
            <th>Total Qty</th>
            <th>Price</th> {/* you can remove this */}
            <th>Grand Total</th>
            <th>Date</th>
            <th>Invoice</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              // Combine book names
              const bookNames = order.books
                .map((item) => item.bookId?.bookName)
                .join(", ");

              // Calculate grand total for that order
              const grandTotal = order.books.reduce(
                (sum, item) => sum + item.total,
                0
              );

              return (
                <tr key={order._id}>
                  <td>{bookNames}</td>
                  <td>{order.studentName || "-"}</td>
                  <td>{order.className || "-"}</td>

                  {/* Total Quantity of all books */}
                  <td>
                    {order.books.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </td>

                  {/* Optional: remove this column if not needed */}
                  <td>-</td>

                  <td>₹ {grandTotal}</td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => downloadInvoice(order._id)}
                      title="Download Invoice"
                    >
                      <FaDownload className="text-primary" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
