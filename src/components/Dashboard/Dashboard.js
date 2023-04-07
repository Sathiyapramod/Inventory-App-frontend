import React, { useState, useEffect } from "react";
import { backendAPI } from "../General";
import { useNavigate } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Dashboard() {
  let roleID = localStorage.getItem("cadreID");

  const navigate = useNavigate();
  const [workflow, setworkflows] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [totalQuantity, setTotal] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentStockvalue, setCurrentValue] = useState(0);
  const [bookedValue, setBooked] = useState(0);
  const [billedCustomers, setBilledcustomers] = useState([]);
  const [customers, setcustomers] = useState([]);

  const getBillData = () => {
    fetch(`${backendAPI}/billabstract`)
      .then((response) => response.json())
      .then((result) => {
        setBilledcustomers(result);
      });
  };

  const getCustomers = () => {
    fetch(`${backendAPI}/customers`)
      .then((response) => response.json())
      .then((result) => {
        setcustomers(result);
      });
  };
  const getInventory = () => {
    fetch(`${backendAPI}/inventory`)
      .then((response) => response.json())
      .then((result) => {
        setInventory(result);
        let totalQty = 0,
          currentQty = 0,
          currentValue = 0,
          bookedValue = 0;
        for (let items in inventory) {
          totalQty += Number(inventory[items].totalQty);
          currentQty += Number(inventory[items].billedQty);
          currentValue +=
            Number(inventory[items].totalQty) * Number(inventory[items].rate);
          bookedValue +=
            Number(inventory[items].billedQty) * Number(inventory[items].rate);
        }
        setTotal(totalQty);
        setCurrentStock(currentQty);
        setCurrentValue(currentValue);
        setBooked(bookedValue);
      });
  };

  useEffect(() => {
    getInventory();
    getBillData();
    getCustomers();
    fetch(`${backendAPI}/workflow`)
      .then((response) => response.json())
      .then((result) => {
        setworkflows(
          result.filter((user) => {
            return user.empName == localStorage.getItem("currentUser");
          })[0].workflow.length
        );
      });
  }, [workflow]);

  // console.log(workflow);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Dashboard
        </span>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center gap-5">
        <div className="card bg-light" style={{ width: "18rem" }}>
          <span className="pt-2 fs-5">Total Units</span>
          <div className="card-body fs-1">{totalQuantity}</div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <span className="pt-2 fs-5">Current Stock(Units)</span>
          <div className="card-body fs-1">{currentStock}</div>
        </div>
        <div className="card bg-light" style={{ width: "18rem" }}>
          <span className="pt-2 fs-5">Stock Current Value</span>
          <div className="card-body fs-1">
            {currentStockvalue.toLocaleString("hi-IN")}
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <span className="pt-2 fs-5">Booked Stock</span>
          <div className="card-body fs-1">
            {bookedValue.toLocaleString("hi-IN")}
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="bg-light p-2">
          <span className="fs-5 pt-2 pb-2 fw-bolder">Customer Data</span>
          {billedCustomers && (
            <BarChart
              width={500}
              height={500}
              data={billedCustomers}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TotalAmount" fill="#8884d8" />
            </BarChart>
          )}
        </div>
        <div className="bg-light p-3">
          <span className="fs-4 pt-2 pb-2 fw-bolder">Inventory Data</span>
          {inventory && (
            <BarChart
              width={500}
              height={300}
              data={inventory}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="billedQty" stackId="a" fill="#8884d8" />
              <Bar dataKey="availableQty" stackId="a" fill="#82ca9d" />
            </BarChart>
          )}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        {roleID !== 1 && (
          <div className="card bg-light p-3" style={{ width: "25%" }}>
            <span className="pt-2 fs-5">Pending Approvals</span>
            <div className="card-body fs-1">
              {roleID == 1 ? (
                <span>Access Disabled</span>
              ) : (
                <span>{workflow}</span>
              )}
            </div>
            <span>
              {roleID == 1 ? (
                <></>
              ) : (
                <button
                  className="btn btn-outline-dark"
                  onClick={() => navigate("/dashboard/approvals")}
                >
                  View
                </button>
              )}
            </span>
          </div>
        )}
        <div style={{ width: "75%" }}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Contact No</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers &&
                customers.map((customer, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.contactNo}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button className="btn btn-outline-dark">View</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
