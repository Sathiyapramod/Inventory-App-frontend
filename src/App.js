import "./App.css";
import { useState, useEffect } from "react";
import { backendAPI } from "./components/General";
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
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CreateBill from "./components/billing/CreateBill";
import Approvals from "./components/Dashboard/Approvals";
import StockTransfer from "./components/Transfer/StockTransfer";
import Workflow from "./components/Workflow/Workflow";

function App() {
  const navigate = useNavigate();
  // const [workflowUsers, setWorkflowUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  async function newSignin() {
    let signin = {
      username,
      password,
    };
    const data = await fetch(`${backendAPI}/users/signin`, {
      method: "POST",
      body: JSON.stringify(signin),
      headers: {
        "content-type": "application/json",
      },
    });
    if (data.status === 401) {
      console.log("error");
      navigate("/");
    } else {
      const response = await data.json();
      setUser(response);
      console.log(response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("jobRole", response.jobRole);
      localStorage.setItem("currentUser", response.username);
      localStorage.setItem("cadreID", response.cadreID);
      navigate("/dashboard");
    }
  }

  window.onbeforeunload = function () {
    localStorage.clear();
  };

  return (
    <div className="App">
      <div className="d-flex flex-row">
        <Appbar />
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
function Login({ setUsername, setPassword, newSignin }) {
  const navigate = useNavigate();
  return (
    <div className="login mx-auto">
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <label className="form-label">User name</label>
          <span className="col-5">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => setUsername(event.target.value)}
            />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <label className="form-label">Password</label>
          <span className="col-5">
            {" "}
            <input
              type="password"
              className="form-control me-2"
              onChange={(event) => setPassword(event.target.value)}
            />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              newSignin();
            }}
          >
            Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? (
    <div>{children}</div>
  ) : (
    <div>
      <Navigate replace to="/" />
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jobRole, setJobrole] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const Register = () => {
    const newUser = {
      username,
      password,
      jobRole,
      email,
    };
    // console.log(newUser);
    fetch(`${backendAPI}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5 ">
      <span className="fs-2">Register with Us. !!</span>
      <div className="form-floating">
        <input
          type="text"
          className="form-control me-2"
          id="floatingLabel"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className="form-label" htmlFor="floatingLabel">
          Username
        </label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control me-2"
          id="floatingLabel"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label className="form-label" htmlFor="floatingLabel">
          Password
        </label>
      </div>
      <div className="d-flex flex-row justify-content-around align-items-center gap-5">
        <div className="form-floating">
          <select
            className="form-control me-2 col-5"
            onChange={(event) => setJobrole(event.target.value)}
          >
            <option defaultValue="stores">stores</option>
            <option defaultValue="accounts">accounts</option>
            <option defaultValue="manager">manager</option>
            <option defaultValue="unit head">head</option>
          </select>
          <label className="form-label" htmlFor="floatingLabel">
            Job Role
          </label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control me-2"
            id="floatingLabel"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="form-label" htmlFor="floatingLabel">
            Email ID
          </label>
        </div>
      </div>
      <button className="btn btn-outline-primary" onClick={() => Register()}>
        Register
      </button>
      <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
        Go to Home Page
      </button>
    </div>
  );
}

export default App;
