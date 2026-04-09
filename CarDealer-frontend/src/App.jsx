import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CarDetails from "./CarDetails";
import ViewInquiries from "./ViewInquiries";
import ManageVehicles from "./ManageVehicles";
import ViewTestDrives from "./ViewTestDrives";
import BrowseVehicles from "./BrowseVehicles";
import SubmitForm from "./SubmitForm";
import RequestTestDrive from "./RequestTestDrive";
import CustomerInquiry from "./CustomerInquiry";
import TestDriveRequest from "./TestDriveRequest";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import CustomerRegister from "./CustomerRegister";
import CustomerLogin from "./CustomerLogin";
import CustomerDashboard from "./CustomerDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-vehicles" element={<BrowseVehicles />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/submit-form" element={<SubmitForm />} />
          <Route path="/request-test-drive" element={<RequestTestDrive />} />
          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inquiries"
            element={
              <ProtectedRoute>
                <ViewInquiries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-vehicles"
            element={
              <ProtectedRoute>
                <ManageVehicles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test-drives"
            element={
              <ProtectedRoute>
                <ViewTestDrives />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer-inquiry/:id"
            element={
              <ProtectedRoute>
                <CustomerInquiry />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test-drive-request/:id"
            element={
              <ProtectedRoute>
                <TestDriveRequest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;