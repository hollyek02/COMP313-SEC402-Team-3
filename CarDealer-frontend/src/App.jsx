import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CarDetails from "./CarDetails";
import ViewInquiries from "./ViewInquiries";
import ManageVehicles from "./ManageVehicles";
import ViewTestDrives from "./ViewTestDrives";
<<<<<<< HEAD
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
=======
import BrowseVehicles from "./BrowseVehicles";
import SubmitForm from "./SubmitForm";
import RequestTestDrive from "./RequestTestDrive";
import CustomerInquiry from "./CustomerInquiry";
import TestDriveRequest from "./TestDriveRequest";

import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import {AuthProvider} from "./AuthContext";




function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>

                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/browse-vehicles" element={<BrowseVehicles />} />
                    <Route path="/car/:id" element={<CarDetails />} />
                    <Route path="/submit-form" element={<SubmitForm />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/request-test-drive" element={<RequestTestDrive />} />


                    {/* Protected routes */}
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
>>>>>>> d503c44a1ad7146200230d04951bf3a971585e02
}

export default App;