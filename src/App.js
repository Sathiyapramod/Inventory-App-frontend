import "./App.css";
import { useState } from "react";
import Appbar from "./components/appbar/Appbar";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Billing from "./components/billing/Billing";
import Customers from "./components/customers/Customers";
import Inventory from "./components/inventory/Inventory";
import Payment from "./components/payments/Payment";
import Purchase from "./components/Purchase/Purchase";
import CreatePO from "./components/Purchase/CreatePO";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateBill from "./components/billing/CreateBill";
import Approvals from "./components/Dashboard/Approvals";
import StockTransfer from "./components/Transfer/StockTransfer";
import Workflow from "./components/Workflow/Workflow";
import { Login } from "./components/common/Login";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { Register } from "./components/common/Register";
import API from "./services/api";

function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function newSignin() {
        let credentials = {
            username,
            password,
        };
        const { data, status } = await API.login(credentials);

        if (status === 401 || status === 400) {
            console.log("error");
            navigate("/");
        } else {
            setUser(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("jobRole", data.jobRole);
            localStorage.setItem("currentUser", data.username);
            localStorage.setItem("cadreID", data.cadreID);
            navigate("/dashboard");
        }
    }

    window.onbeforeunload = function () {
        localStorage.clear();
    };

    console.log(window.location.pathname);
    return (
        <div className="App">
            <div className="d-flex flex-row">
                {window.location.pathname !== "/" ? <Appbar /> : <></>}
                <div className="container-fluid">
                    <Navbar user={user} />
                    <div className="main-page">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Login
                                        setUsername={setUsername}
                                        setPassword={setPassword}
                                        newSignin={newSignin}
                                    />
                                }
                            />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile user={user} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/billing"
                                element={
                                    <ProtectedRoute>
                                        <Billing />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/billing/create"
                                element={
                                    <ProtectedRoute>
                                        <CreateBill />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/warehouse"
                                element={
                                    <ProtectedRoute>
                                        <Inventory />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/customers"
                                element={
                                    <ProtectedRoute>
                                        <Customers />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/purchaseorder"
                                element={
                                    <ProtectedRoute>
                                        <Purchase />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/purchaseorder/create"
                                element={
                                    <ProtectedRoute>
                                        <CreatePO />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/approvals"
                                element={
                                    <ProtectedRoute>
                                        <Approvals />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/payment"
                                element={
                                    <ProtectedRoute>
                                        <Payment />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/transfer"
                                element={
                                    <ProtectedRoute>
                                        <StockTransfer />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/workflow"
                                element={
                                    <ProtectedRoute>
                                        <Workflow />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
