import React, { useState, useEffect } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { backendAPI } from "../General";

function Payment() {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    fetch(`${backendAPI}/billing`)
      .then((response) => response.json())
      .then((result) => setCustomers(result));
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Payments Dashboard
        </span>

        <div className="card">
          <div className="card-body">
            Payment disbursements and updating on app will be done by Accounts
            Team. Access for the same is provided to them.{" "}
          </div>
        </div>
      </div>
      <hr />
      {customers && (
        <table className="table">
          <thead>
            <tr>
              {[
                "#",
                "Bill Number",
                "Customer Name",
                "Gross Amount",
                "Net Amount with Taxes",
                "Payment Mode",
                "Action",
              ].map((heading, index) => {
                return <th key={index}>{heading}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {customers.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{"BIL".concat(element._id.slice(15))}</td>
                  <td>{element.customerName}</td>
                  <td>{element.grossTotal}</td>
                  <td>{element.NetTotal}</td>
                  <td>{element.billMode}</td>
                  <td>{element.billMode == "Cash" ? "Paid" : "Pending"}</td>
                  <td>
                    {localStorage.getItem("jobRole") == "accounts" && (
                      <span><Counter status={status} setStatus={setStatus} /></span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Counter(){
  return (
    <button>{}</button>
  )
}
export default Payment;
