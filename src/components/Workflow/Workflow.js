import React, { useState, useEffect } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { backendAPI } from "../General";

function Workflow() {
  const [workflow, setWorkflow] = useState([]);
  const getWorkflow = () => {
    fetch(`${backendAPI}/workflow`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setWorkflow(result);
      });
  };

  useEffect(() => {
    getWorkflow();
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Workflow Dashboard
        </span>
        <span>
          {localStorage.getItem("jobRole") === "admin" && (
            <button className="btn btn-secondary">CREATE WORKFLOW </button>
          )}
        </span>
      </div>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {["#", "Employee Name", "Role Assigned", "Status"].map(
              (element, index) => {
                return <th key={index}>{element}</th>;
              }
            )}
          </tr>
        </thead>
        <tbody>
          {workflow &&
            workflow.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.empName}</td>
                  <td>
                    {user.cadreID == 1 ? "Stores" : ""}
                    {user.cadreID == 2 ? "Manager" : ""}
                    {user.cadreID == 3 ? "Accounts" : ""}
                    {user.cadreID == 4 ? "Unit Head" : ""}
                    {user.cadreID == 5 ? "System Admin" : ""}
                  </td>
                  <td>{user.cadreID && "Access Available"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Workflow;
