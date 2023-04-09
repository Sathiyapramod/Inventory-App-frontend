import React, { useState, useEffect } from "react";
import { backendAPI } from "../General";
import { useNavigate } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
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
    fetch(`${backendAPI}/users/billabstract`,{
      headers:{
        "Content-type":"application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => {
        setBilledcustomers(result);
      });
  };

  const getCustomers = () => {
    fetch(`${backendAPI}/customers`,{
      headers:{
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then((response) => response.json())
      .then((result) => {
        setcustomers(result);
      });
  };
  const getInventory = () => {
    fetch(`${backendAPI}/inventory`,{
      headers:{
        "x-auth-token":localStorage.getItem("token")
      }
    })
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
    fetch(`${backendAPI}/workflow`,{
      headers:{
        "x-auth-token": localStorage.getItem("token")
      }
    })
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
        <span>
          <span className="fs-3">
            <ReceiptIcon /> Dashboard
          </span>
          <span className="breadcrumb text-black-50">Dashboard</span>
        </span>
        <br />
        <span>
          {roleID !== 1 && (
            <div className="card">
              <span className="fs-5 card-header">Pending Approvals</span>
              <div className="card-body fs-2">
                {roleID == 1 ? (
                  <span>Access Disabled</span>
                ) : (
                  <span>{workflow}</span>
                )}
                <span>
                  {" "}
                  {roleID == 1 ? (
                    <></>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => navigate("/dashboard/approvals")}
                    >
                      View
                    </button>
                  )}
                </span>
              </div>
            </div>
          )}
        </span>
      </div>
      <hr />
      <div className="d-flex flex-row justify-content-center align-items-center gap-5 mx-auto flex-wrap">
        <div className="card bg-warning-subtle" style={{ width: "18rem" }}>
          <div className="d-flex flex-row-reverse justify-content-center align-items-center">
            <span className="fs-5 text-dark-emphasis pe-3 col-3">
              Total Units
            </span>
            <span className="card-body fs-1">{totalQuantity}</span>
          </div>
        </div>
        <div
          className="card bg-info-subtle bg-gradient"
          style={{ width: "18rem" }}
        >
          <div className="d-flex flex-row-reverse justify-content-center align-items-center">
            <span className="fs-5 text-dark-emphasis pe-2 col-5">
              Current Stock (units)
            </span>
            <span className="card-body fs-1">{currentStock}</span>
          </div>
        </div>
        <div
          className="card bg-danger-subtle bg-gradient"
          style={{ width: "18rem" }}
        >
          <div className="d-flex flex-row-reverse justify-content-center align-items-center">
            <span className="fs-5 text-dark-emphasis col-4">
              Current Stock (₹)
            </span>
            <span className="card-body fs-1 ps-3">
              {currentStockvalue.toLocaleString("hi-IN")}
            </span>
          </div>
        </div>
        <div className="card bg-info bg-gradient" style={{ width: "18rem" }}>
          <div className="d-flex flex-row-reverse justify-content-center align-items-center">
            <span className="fs-5 text-dark-emphasis pe-3 col-4">
              Booked Stock (₹)
            </span>
            <span className="card-body fs-1">
              {bookedValue.toLocaleString("hi-IN")}
            </span>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex flex-row justify-content-center align-items-center flex-wrap gap-5 mx-auto">
        <div className="card rounded-2" style={{ width: "45%" }}>
          <span className="fs-5 fw-bold card-header bg-light text-start">
            <CorporateFareRoundedIcon /> Customer Data
          </span>
          {billedCustomers && (
            <BarChart
              className="card-body"
              width={500}
              height={400}
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
        <div className="card rounded-2" style={{ width: "45%" }}>
          <span className="fs-5 fw-bolder card-header text-start">
            <CorporateFareRoundedIcon /> Inventory Data
          </span>
          {inventory && (
            <BarChart
              width={500}
              height={400}
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
      <hr />
      <div className="d-flex flex-row justify-content-center align-items-center mx-auto pt-2 pb-2">
        <div className="card container">
          <span className="card-header fs-5 fw-bold">Customers Data</span>
          <div className="card-body">
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
    </div>
  );
}

export default Dashboard;
