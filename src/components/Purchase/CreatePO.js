import React, { useState, useEffect } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { backendAPI } from "../General";

function CreatePO() {
  let Role = localStorage.getItem("jobRole");
  const [workflow, setworkflows] = useState([]);
  const [itemList, setItemlist] = useState([]);
  const [itemName, setItemName] = useState("");
  const [units, setUnits] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [itemGST, setItemGST] = useState(0);
  const [rate, setRate] = useState(0);
  const [vendorName, setVendor] = useState("");
  const [contactNo, setContact] = useState(0);
  const [address, setAddress] = useState("");
  const [gstNumber, setGST] = useState("");
  const [date, setDate] = useState("");
  const [grossTotal, setGrossTotal] = useState(0);
  const [gst, setTax] = useState(0);
  const [NetAmount, setNetTotal] = useState(0);
  const [approver, setApprover] = useState("");

  const AddItemToPO = () => {
    let total = Number(rate) * Number(quantity) * 0.01 * Number(itemGST);
    const newItem = {
      itemName,
      units,
      quantity,
      gst: Number(itemGST),
      rate,
      total,
    };

    setItemlist([...itemList, newItem]);
  };

  const OrderCreation = () => {
    const newOrder = {
      vendorName,
      contactNo,
      address,
      gstNumber,
      POItems: itemList,
      date: new Date(date),
      grossTotal,
      gst,
      NetAmount,
    };
  };
  const newPurchaseOrder = () => {
    const newPO = {
      vendorName,
      grossTotal,
      gst,
      NetAmount,
      POItems: itemList,
      date: new Date(date),
      isAuthorized: 0,
      isScrutinized: 0,
      isApproved: 0,
    };

    let id = workflow.find((user) => {
      return user.empName == approver.toLowerCase();
    })._id;

    fetch(`${backendAPI}/workflow/${id}`, {
      method: "PUT",
      body: JSON.stringify(newPO),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(() => alert("Purchase Order Approval Sent to Approver"));
    fetch(``, {
      method: "POST",
      body: JSON.stringify(newPO),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => alert("PO database Updated Successfully !!!"));
  };
  const getWorkflow = () => {
    fetch(`${backendAPI}/workflow`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => setworkflows(result));
  };

  useEffect(() => {
    let total = 0,
      gstAmount = 0;
    for (let item in itemList) {
      total += Number(itemList[item].total);
      gstAmount += Number(
        itemList[item].quantity * Number(itemList[item].rate * 0.01)
      );
    }
    setGrossTotal(total);
    setTax(Math.ceil(gstAmount));
    setNetTotal(Math.ceil(total + gstAmount));
    getWorkflow();
  }, [grossTotal, gst, NetAmount, itemList, workflow]);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Purchase Order Creation
        </span>
        <span>
          {Role === "stores" && (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Item
            </button>
          )}
        </span>
      </div>
      <hr />
      <div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <label>Vendor name</label>
          <span className="col-5">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => setVendor(event.target.value)}
            />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <label>Contact Number</label>
          <span className="col-5">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => setContact(event.target.value)}
            />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <label>Address</label>
          <span className="col-5">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => setAddress(event.target.value)}
            />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <label>GST Number</label>
          <span className="col-5">
            <input
              type="text"
              className="form-control me-2"
              onChange={(event) => setGST(event.target.value)}
            />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
          <label>PO Date</label>
          <span className="col-5">
            <input
              type="date"
              className="form-control date fs-5"
              onChange={(event) => setDate(event.target.value)}
            />
          </span>
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              {[
                "#",
                "Description of Item",
                "units",
                "Quantity",
                "Rate",
                "Amount (incl.GST)",
                "Actions",
              ].map((element, index) => {
                return <th key={index}>{element}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {itemList &&
              itemList.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{items.itemName}</td>
                    <td>{items.units}</td>
                    <td>{items.quantity}</td>
                    <td>{items.rate}</td>
                    <td>{items.total}</td>
                    <td>
                      <button className="btn btn-success">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <AddItem
        setItemName={setItemName}
        setUnits={setUnits}
        setQuantity={setQuantity}
        setRate={setRate}
        AddItemToPO={AddItemToPO}
        setItemGST={setItemGST}
      />
      {itemList.length !== 0 && (
        <div>
          <div className="position-absolute bottom-0 pb-5 pe-3">
            <button
              className="btn btn-success btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#sendForApproval"
              onClick={() => OrderCreation()}
            >
              Create PO
            </button>
            <SendforApproval
              workflow={workflow}
              newPurchaseOrder={newPurchaseOrder}
              setApprover={setApprover}
            />
          </div>
          <div className="position-absolute bottom-0 end-0 pb-5 pe-3">
            <div className="d-flex flex-column justify-content-center align-items-end">
              <span className="d-flex flex-row gap-2 justify-content-center">
                <label className="form-label fs-5">Gross Amount</label>
                <span className="fs-4">
                  {grossTotal.toLocaleString("hi-IN")}
                </span>
              </span>
              <span className="d-flex flex-row gap-2 justify-content-center">
                <label className="form-label fs-5">GST</label>
                <span className="fs-4">{gst.toLocaleString("hi-IN")}</span>
              </span>
              <span className="d-flex flex-row gap-2 justify-content-center">
                <label className="form-label fs-5">Total Amount</label>
                <span className="fs-4">
                  {NetAmount.toLocaleString("hi-IN")}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function AddItem({
  setItemName,
  setQuantity,
  setUnits,
  setRate,
  AddItemToPO,
  setItemGST,
}) {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
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
              Add PO Item
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Item Name</label>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control me-2"
                  onChange={(event) => setItemName(event.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Units</label>
              <div className="col-5">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    onChange={(event) => {
                      setUnits(event.target.value);
                    }}
                  >
                    <option defaultValue="sqm">sqm</option>
                    <option defaultValue="lot">Lot</option>
                    <option defaultValue="kg">Kg</option>
                    <option defaultValue="quintals">Quintals</option>
                  </select>
                  <label htmlFor="floatingSelectGrid">Select Units</label>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Quantity</label>
              <div className="col-5">
                <input
                  type="Number"
                  step={5}
                  min={5}
                  className="form-control me-2"
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">GST %</label>
              <div className="col-5">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    onChange={(event) => {
                      setItemGST(event.target.value);
                    }}
                  >
                    <option defaultValue="5">5</option>
                    <option defaultValue="12">12</option>
                    <option defaultValue="18">18</option>
                    <option defaultValue="28">28</option>
                  </select>
                  <label htmlFor="floatingSelectGrid">Select GST %</label>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Rate</label>
              <div className="col-5">
                <input
                  type="Number"
                  step={10}
                  min={5}
                  className="form-control me-2"
                  onChange={(event) => setRate(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                AddItemToPO();
              }}
            >
              Create Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SendforApproval({ workflow, newPurchaseOrder, setApprover }) {
  return (
    <div
      className="modal fade"
      id="sendForApproval"
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
              PURCHASE ORDER CREATION
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
              <div className="col-5">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelectGrid"
                    onChange={(event) => {
                      setApprover(event.target.value);
                    }}
                  >
                    <option defaultChecked="SelectOne">--Select One --</option>
                    {workflow.length != 0 &&
                      workflow
                        .filter((user) => {
                          return (
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
                newPurchaseOrder();
              }}
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePO;
