// import logo from './logo.svg';
import './App.css';
import AdminDashboard from "./pages/superadmin/AdminDashboard";
import Dashboard from "./pages/client/Dashboard"
import CounterDashboard from "./pages/client/counter/CounterDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from "./layouts/DashboardLayout";
import SchoolsList from './pages/client/schools/SchoolsList';
import OrderList from './pages/client/orders/OrderList';
import AddOrder from './pages/client/orders/AddOrder';
import BooksList from './pages/client/books/BooksList';
import CountersList from './pages/client/counter/CounterList';
import AddCounter from './pages/client/counter/AddCounter'
import AddSchool from './pages/client/schools/AddSchool';
import AddBook from './pages/client/books/AddBook';
import CreateClient from './pages/superadmin/CreateClient';
import Inventory from './pages/client/inventory/Inventory';
import CounterStock from './pages/client/counter/CounterStock';
import AssignStock from "./pages/client/counter/AssignStock";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/super-admin/admin-dashboard" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/super-admin/create-client" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><CreateClient /></ProtectedRoute>} />
        
        <Route path="/branches/:branchId" 
        element={<ProtectedRoute allowedRoles={["CLIENT", "SUPER_ADMIN", "COUNTER"]}><DashboardLayout /></ProtectedRoute>} >
          <Route index element={<Dashboard />} />
          {/* Schools */}
          <Route path="schools" element={<SchoolsList />} />
          <Route path="schools/add" element={<AddSchool />}/>
          <Route path="schools/edit/:id" element={<AddSchool />} />
          {/* Books */}
          <Route path="books" element={<BooksList />}/>
          <Route path="books/add" element={<AddBook />}/>
          <Route path="books/edit/:id" element={<AddBook />} />
          {/* Counters */}
          <Route path="counters" element={<CountersList />}/>
          <Route path="counters/add" element={<AddCounter />}/>
          <Route path="counters/edit/:id" element={<AddCounter />} />
          {/* Inventory Path */}
          <Route path="inventory" element={<Inventory />}/>
          {/* Counter Stock */}
          <Route path="counter-stock/:counterId" element={<CounterStock />}/>
          <Route path="/branches/:branchId/counter-stock/assign" element={<AssignStock />}/>
          {/* Counter Orders */}
          <Route path="counter/:counterId/sell" element={<AddOrder />} />
          <Route path="counter/:counterId/orders" element={<OrderList />} />
           {/* CLIENT ORDERS */}
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/create" element={<AddOrder />} />
          {/* Counter Dashboard */}
          <Route path="counter-dashboard" element={<CounterDashboard />} />
          
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
