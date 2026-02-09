
import Header from "../components/Header";

function AdminDashboardLayout({ children }) {
  return (
    <div className="d-flex">

      <div className="flex-grow-1">
        <Header />

        <div className="container-fluid mt-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
