import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../General";
import { Pagination } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "./Billing.css";

const handlePrint = () => window.print();

function Billing() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [billdetails, setBilldetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, page) => {
    setCurrentPage(page);
    let startIndex = (page - 1) * 5;
    let endIndex = startIndex + 4;
    fetch(`${backendAPI}/billing`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBills(result.slice(startIndex, endIndex));
      });
  };

  useEffect(() => {
    fetch(`${backendAPI}/billing`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setBills(result);
      });
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Billing Records
        </span>
        <span>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/billing/create")}
          >
            + CREATE BILL
          </button>
        </span>
      </div>
      <hr />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              {[
                "#",
                "Date",
                "Bill Number",
                "Customer Name",
                "Bill Mode",
                "Payment Period",
                "Gross Bill",
                "GST",
                "Net Bill",
                "Action",
              ].map((element, index) => {
                return <th key={index}>{element}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {bills.length !== 0 ? (
              bills.map((billItem, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(billItem.date).toLocaleDateString("hi-IN")}
                    </td>
                    <td>{"BIL".concat(billItem._id.slice(0, 10))}</td>
                    <td>{billItem.customerName}</td>
                    <td>{billItem.billMode}</td>
                    <td>{billItem.creditPeriod}</td>
                    <td>{billItem.grossTotal}</td>
                    <td>{billItem.gst}</td>
                    <td>{billItem.NetTotal}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#viewBill"
                        onClick={() => {
                          setBilldetail(billItem);
                        }}
                      >
                        View Bill
                      </button>
                      <ViewBilldetail billdetails={billdetails} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        count={3}
        color="secondary"
        className="d-flex flex-row justify-content-center mx-auto"
        page={currentPage}
        defaultPage={1}
        onChange={handleChange}
      />
    </div>
  );
}

function ViewBilldetail(props) {
  return (
    <div
      className="modal fade printing-page"
      id="viewBill"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      {props.billdetails && (
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header hide-on-plot">
              {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mx-auto fs-5">Tax Invoice</div>
              <br />
              <div className="mx-auto fs-5 d-flex flex-column align-items-center justify-content-center">
                <span className="fs-2 fw-bolder">Rampage</span>
                <span className="fs-4">#32, Godown Street</span>
                <span className="fs-4">George Town, Chennai - 600 001</span>
              </div>
              <br />
              <div className="d-flex flex-row justify-content-between align-items-center ps-2 pe-2">
                <div>
                  <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                    <div className="form-floating">
                      <input
                        type="text"
                        defaultValue={props.billdetails._id}
                        className="form-control me-2"
                        id="floatingLabel"
                        readOnly
                      />
                      <label className="form-label" htmlFor="floatingLabel">
                        Billing ID
                      </label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="text"
                        defaultValue={props.billdetails.customerName}
                        className="form-control me-2"
                        id="floatingLabel"
                        readOnly
                      />
                      <label className="form-label" htmlFor="floatingLabel">
                        Customer Name
                      </label>
                    </div>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      defaultValue={props.billdetails.billMode}
                      className="form-control me-2"
                      id="floatingLabel"
                      readOnly
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Bill Mode
                    </label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      defaultValue={props.billdetails.creditPeriod}
                      className="form-control me-2"
                      id="floatingLabel"
                      readOnly
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Credit Period
                    </label>
                  </div>
                </div>
                <div>
                  <div className="form-floating">
                    <input
                      type="text"
                      defaultValue={props.billdetails.billingAddress}
                      className="form-control me-2"
                      id="floatingLabel"
                      readOnly
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Billing Address
                    </label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      defaultValue={props.billdetails.billingAddress}
                      className="form-control me-2"
                      id="floatingLabel"
                      readOnly
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Shipping Address
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <div className="d-flex flex-row justify-content-center align-items-start">
                <table className="table container table-bordered table-hover">
                  <thead>
                    <tr>
                      {[
                        "#",
                        "Item Name",
                        "UOM",
                        "Quantity",
                        "Rate",
                        "Amount",
                      ].map((element, index) => {
                        return <th key={index}>{element}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {props.billdetails.items &&
                      props.billdetails.items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.units}</td>
                            <td>{item.qty}</td>
                            <td>{item.rate}</td>
                            <td>{item.total}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="position-absolute bottom-0 end-0 pe-4">
                <span className="d-flex flex-row justify-content-end align-items-end gap-2">
                  <label className="form-label">Gross Total</label>
                  <span className="fs-4">₹{props.billdetails.grossTotal}</span>
                </span>
                <span className="d-flex flex-row justify-content-end align-items-end gap-2">
                  <label className="form-label col">GST </label>
                  <span className="fs-4">₹{props.billdetails.gst}</span>
                </span>
                <span className="d-flex flex-row justify-content-end align-items-end gap-2">
                  <label className="form-label col">Total Amount </label>
                  <span className="fs-4">₹{props.billdetails.NetTotal}</span>
                </span>
              </div>
              <div className="position-absolute bottom-0 start-0 ps-3 fst-italic">
                This is a System Generated Invoice, Hence Signature is not
                required.
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary hide-on-plot"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary hide-on-plot"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;
