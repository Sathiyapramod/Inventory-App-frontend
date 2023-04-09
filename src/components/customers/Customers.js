import React, { useState, useEffect } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { backendAPI } from "../General";
// import { useNavigate } from "react-router-dom";

function Customers() {
  //   const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [customerName, setCustomername] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState(0);

  const getCustomerData = () => {
    fetch(`${backendAPI}/customers`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => setCustomers(result));
  };

  async function AddNewCustomer() {
    let newCustomer = {
      customerName,
      gstNumber,
      address,
      contactNo,
    };
    const data = await fetch(`${backendAPI}/customers`, {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: {
        "content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    if (data.status === 401) console.log("error");
    else {
      const result = await data.json();
      alert("new Customer Added Successfully");
      getCustomerData();
    }
  }

  useEffect(() => {
    getCustomerData();
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Customer Data
        </span>
        <span>
          <button
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#createCustomer"
          >
            + ADD CUSTOMER
          </button>
        </span>
      </div>
      <CreateCustomer
        setCustomername={setCustomername}
        setGstNumber={setGstNumber}
        setContactNo={setContactNo}
        setAddress={setAddress}
        AddNewCustomer={AddNewCustomer}
      />
      <hr />
      <table className="table table-hover">
        <thead>
          <tr>
            {[
              "#",
              "Customer Name",
              "GST Number",
              "Contact Number",
              "Edit Action",
              "Delete Action",
            ].map((customerDetail, index) => {
              return <th key={index}>{customerDetail}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customerDetail, index) => {
              return (
                <tr key={customerDetail._id}>
                  <td>{index + 1}</td>
                  <td>{customerDetail.customerName}</td>
                  <td>{customerDetail.gstNumber}</td>
                  <td>{customerDetail.contactNo}</td>
                  <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        setCustomerData(customerDetail);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#viewCustomer"
                    >
                      View
                    </button>
                    <ViewCustomer customerData={customerData} />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        
                        fetch(`${backendAPI}/customers/${customerDetail._id}`, {
                          method: "DELETE",
                          headers: {
                            "x-auth-token": localStorage.getItem("token"),
                          },
                        })
                          .then((response) => response.json())
                          .then(() =>
                            alert("Customer Data Deleted Successfully")
                          );
                        getCustomerData();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

function CreateCustomer({
  setCustomername,
  setGstNumber,
  setContactNo,
  setAddress,
  AddNewCustomer,
}) {
  return (
    <div
      className="modal fade"
      id="createCustomer"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Create Customer
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row justify-content-between align-items-center ps-2 pe-2">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="form-floating">
                  <input
                    type="text"
                    className="form-control me-2"
                    onChange={(event) => {
                      setCustomername(event.target.value);
                    }}
                    id="floatingCustomer"
                  />
                  <label className="form-label" htmlFor="floatingCustomer">
                    Enter Customer Name
                  </label>
                </span>
                <br />
                <span className="form-floating">
                  <input
                    type="text"
                    className="form-control me-2"
                    onChange={(event) => {
                      setGstNumber(event.target.value);
                    }}
                    id="floatingGSTNumber"
                  />
                  <label className="form-label" htmlFor="floatingGSTNumber">
                    GST Number
                  </label>
                </span>{" "}
                <br />
                <span className="form-floating">
                  <input
                    type="text"
                    className="form-control me-2"
                    onChange={(event) => {
                      setContactNo(event.target.value);
                    }}
                    id="floatingContact"
                  />
                  <label className="form-label" htmlFor="floatingContact">
                    Contact No
                  </label>
                </span>
                <br />
              </div>
              <div className="col-5 form-floating">
                <textarea
                  type="text"
                  className="form-control me-2"
                  rows={5}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                  id="floatingAddress"
                />
                <label className="form-label" htmlFor="floatingAddress">
                  Billing Address
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                AddNewCustomer();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewCustomer({ customerData }) {
  return (
    <div>
      {customerData && (
        <div
          className="modal fade"
          id="viewCustomer"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Customer Details - {customerData.customerName}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-row justify-content-between align-items-center gap-4 ps-2 pe-2">
                  <span className="col-5 form-floating">
                    <input
                      type="text"
                      id="floatingLabel"
                      className="form-control me-2"
                      defaultValue={customerData.customerName}
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Customer Name
                    </label>
                  </span>
                  <span className="col-5 form-floating">
                    <input
                      type="text"
                      id="floatingLabel"
                      className="form-control me-2"
                      defaultValue={customerData.gstNumber}
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      GST Number
                    </label>
                  </span>
                </div>
                <br />
                <div className="d-flex flex-row justify-content-between align-items-center ps-2">
                  <span className="col-5 form-floating">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      rows={5}
                      defaultValue={customerData.address}
                      id="floatingLabel"
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Address
                    </label>
                  </span>

                  <span className="col-5 form-floating">
                    <input
                      type="text"
                      className="form-control me-2"
                      defaultValue={customerData.contactNo}
                      id="floatingLabel"
                    />
                    <label className="form-label" htmlFor="floatingLabel">
                      Contact Info
                    </label>
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center"></div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
