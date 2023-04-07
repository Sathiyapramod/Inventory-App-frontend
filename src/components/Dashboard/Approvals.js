import React, { useState, useEffect } from "react";

import { backendAPI } from "../General";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Approvals() {
  const [workflows, setworkflows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [purchaseOrder, setpurchaseOrder] = useState({});
  const [nextApprover, setNextApprover] = useState("");
  const getWorkflows = () => {
    fetch(`${backendAPI}/workflow`)
      .then((response) => response.json())
      .then((result) => {
        setAllUsers(result);
        setworkflows(
          result.find((user) => {
            return user.empName == localStorage.getItem("currentUser");
          }).workflow
        );
      });
  };

  useEffect(() => {
    getWorkflows();
  }, []);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Approvals
        </span>
      </div>
      <hr />
      <div>
        <table className="table table-striped table-hovered">
          <thead>
            <tr>
              {[
                "#",
                "Vendor Name",
                "Gross Total",
                "GST",
                "Net Total",
                "Actions",
              ].map((element, index) => {
                return <th key={index}>{element}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {workflows ? (
              workflows.map((orders, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{orders.vendorName}</td>
                    <td>{orders.grossTotal}</td>
                    <td>{orders.gst}</td>
                    <td>{orders.NetAmount}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setpurchaseOrder(orders)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No Current Approvals</td>
              </tr>
            )}
          </tbody>
        </table>
        <SendforNextApproval
          purchaseOrder={purchaseOrder}
          nextApprover={nextApprover}
          setNextApprover={setNextApprover}
          allUsers={allUsers}
          getWorkflows={getWorkflows}
        />
      </div>
    </div>
  );
}

function SendforNextApproval({
  setNextApprover,
  nextApprover,
  allUsers,
  purchaseOrder,
  getWorkflows,
}) {
  async function SendforApproval() {
    let latestApproval;
    if (
      purchaseOrder.isAuthorized == 0 &&
      purchaseOrder.isScrutinized == 0 &&
      purchaseOrder.isApproved == 0
    )
      latestApproval = { ...purchaseOrder, isAuthorized: 1 };
    else if (
      purchaseOrder.isAuthorized !== 0 &&
      purchaseOrder.isScrutinized == 0 &&
      purchaseOrder.isApproved == 0
    )
      latestApproval = { ...purchaseOrder, isScrutinized: 1 };
    else if (
      purchaseOrder.isAuthorized !== 0 &&
      purchaseOrder.isScrutinized !== 0 &&
      purchaseOrder.isApproved == 0
    )
      latestApproval = { ...purchaseOrder, isApproved: 1 };
    console.log(latestApproval);

    let id = allUsers.find((user) => {
      return user.empName === nextApprover.toLowerCase();
    });
    console.log(typeof id._id);

    const data = await fetch(`${backendAPI}/workflow/${id._id}`, {
      method: "PUT",
      body: JSON.stringify(latestApproval),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.status == 401) console.log("error");
    else {
      const response = await data.json();
      console.log(response);
      alert("PO sent to the Next Approver successfully !!!");
    }
    let senderId = allUsers.find((user) => {
      return user.empName == localStorage.getItem("currentUser");
    })._id;
    console.log(senderId);
    const data1 = await fetch(`${backendAPI}/workflow/update/${senderId}`, {
      method: "PUT",
      body: JSON.stringify(latestApproval),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data1.status == 401) console.log("error");
    else {
      const response = await data1.json();
      console.log(response);
      alert("removed from sender's wf also ");
      getWorkflows();
    }
  }
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row justify-content-center align-items-center gap-3">
              <div className="form-floating col-5">
                <select
                  className="form-select"
                  onChange={(event) => setNextApprover(event.target.value)}
                  id="floatingSelectGrid"
                >
                  <option defaultValue="SelectOne">Select One</option>
                  {allUsers
                    .filter((user) => {
                      return (
                        user.cadreID >= localStorage.getItem("cadreID") &&
                        user.empName != localStorage.getItem("currentUser")
                      );
                    })
                    .map((user, index) => {
                      return (
                        <option key={index} defaultValue={user.empName}>
                          {user.empName.toUpperCase()}
                        </option>
                      );
                    })}
                </select>
                <label htmlFor="floatingSelectGrid">Select Approver</label>
              </div>
              <div className="col-5 form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Send Message</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                SendforApproval();
              }}
            >
              Send for Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Approvals;
