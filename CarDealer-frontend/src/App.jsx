import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CarDetails from "./CarDetails";
import ViewInquiries from "./ViewInquiries";
import ManageVehicles from "./ManageVehicles";
import ViewTestDrives from "./ViewTestDrives";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import CustomerRegister from "./CustomerRegister";
import CustomerLogin from "./CustomerLogin";
import CustomerDashboard from "./CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/inquiries" element={<ViewInquiries />} />
        <Route path="/manage-vehicles" element={<ManageVehicles />} />
        <Route path="/test-drives" element={<ViewTestDrives />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;