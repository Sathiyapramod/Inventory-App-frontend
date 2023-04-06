import React from "react";
import { useNavigate } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Purchase() {
  const navigate = useNavigate();
  let Role = localStorage.getItem("jobRole");
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Purchase Orders
        </span>
        <span>
          {Role !== "stores"  ? (
            <button className="btn btn-success" disabled>
              + Create PO
            </button>
          ) : (
            <button className="btn btn-success" onClick={()=>{console.log("PO Creation Access Enabled");
            navigate("/purchaseorder/create")}}>
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
                "Action",
              ].map((heading, index) => {
                return <th key={index}>{heading}</th>;
              })}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Purchase;
