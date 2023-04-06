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
    fetch(`${backendAPI}/customers`)
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
        method:"POST",
        body:JSON.stringify(newCustomer),
        headers:{
            "content-type":"application/json"
        }
    });
    if(data.status === 401)
        console.log("error")
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
              "Actions",
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
                        // console.log(customerDetail);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#viewCustomer"
                    >
                      View
                    </button>
                    <ViewCustomer customerData={customerData} />
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
      <div className="modal-dialog modal-dialog-centered">
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
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => {
                  setCustomername(event.target.value);
                }}
              />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label className="form-label">GST Number</label>
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => {
                  setGstNumber(event.target.value);
                }}
              />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label className="form-label">Contact No</label>
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => {
                  setContactNo(event.target.value);
                }}
              />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label className="form-label">Billing Address</label>
              <input
                type="text"
                className="form-control me-2"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button> */}
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
  //   console.log(customerData);
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
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
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <label className="form-label">Customer Name</label>
                  <span className="col-5">
                    <input
                      type="text"
                      className="form-control me-2"
                      defaultValue={customerData.customerName}
                      disabled
                    />
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <label className="form-label">Address</label>
                  <span className="col-5">
                    <textarea
                      type="text"
                      className="form-control me-2"
                      rows={3}
                      defaultValue={customerData.address}
                      disabled
                    />
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <label className="form-label">GST Number</label>
                  <span className="col-5">
                    <input
                      type="text"
                      className="form-control me-2"
                      defaultValue={customerData.gstNumber}
                      disabled
                    />
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <label className="form-label">Contact Info</label>
                  <span className="col-5">
                    <input
                      type="text"
                      className="form-control me-2"
                      defaultValue={customerData.contactNo}
                      disabled
                    />
                  </span>
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
                <button type="button" className="btn btn-primary">
                  Understood
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
