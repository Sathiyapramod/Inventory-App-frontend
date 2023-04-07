import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../General";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Purchase() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const getOrders = () => {
    fetch(`${backendAPI}/purchase`)
      .then((response) => response.json())
      .then((result) => setOrders(result));
  };
  useEffect(() => {
    getOrders();
  }, []);
  let Role = localStorage.getItem("jobRole");
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Purchase Orders
        </span>
        <span>
          {Role !== "stores" ? (
            <button className="btn btn-success" disabled>
              + Create PO
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => {
                console.log("PO Creation Access Enabled");
                navigate("/purchaseorder/create");
              }}
            >
              + Create PO
            </button>
          )}
        </span>
      </div>
      <hr />
      <div className="p-3 bg-light rounded-2">
        <table className="table table-striped table-hovered bg-white">
          <thead>
            <tr>
              {[
                "#",
                "PO Date",
                "Vendor Name",
                "Gross Value",
                "GST Amount",
                "Net Value",
                "Status",
                "Details",
              ].map((heading, index) => {
                return <th key={index}>{heading}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {orders.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.date.slice(0, 10)}</td>
                  <td>{element.vendorName}</td>
                  <td>{element.grossTotal}</td>
                  <td>{element.gst}</td>
                  <td>{element.NetAmount}</td>
                  <td>
                    {element.isApproved == 1 &&
                    element.isScrutinized == 1 &&
                    element.isAuthorized == 1
                      ? "Approved"
                      : ""}
                    {element.isApproved == 0 &&
                    element.isScrutinized == 1 &&
                    element.isAuthorized == 1
                      ? "Scrutinized"
                      : ""}
                    {element.isApproved == 0 &&
                    element.isScrutinized == 0 &&
                    element.isAuthorized == 1
                      ? "Authorized"
                      : ""}
                    {element.isApproved == 0 &&
                    element.isScrutinized == 0 &&
                    element.isAuthorized == 0
                      ? "Created"
                      : ""}
                  </td>
                  <td>
                    <button className="btn btn-outline-dark">View PO</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchase;
