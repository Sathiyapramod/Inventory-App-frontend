import React, { useState, useEffect } from "react";
import { backendAPI } from "../General";
import { useNavigate } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function CreateBill() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [billMode, setBillMode] = useState("");
  const [creditPeriod, setCreditPeriod] = useState("Not Applicable");
  const [grossTotal, setGrossTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [NetTotal, setNetTotal] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [units, setUnit] = useState({});
  const [qty, setQty] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [date, setStartDate] = useState(new Date());

  const handleUnit = (itemName) => {
    let itemUnit = inventory.find((item) => {
      return item.name === itemName;
    });
    setUnit(itemUnit);
  };

  const AddItemtoBill = () => {
    let total = Number(units.rate) * Number(qty);
    let newItem = {
      name: units.name,
      units: units.units,
      qty: qty,
      rate: units.rate,
      total: total,
    };
    setItemList([...itemList, newItem]);
  };

  useEffect(() => {
    fetch(`${backendAPI}/inventory`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => setInventory(result));
    fetch(`${backendAPI}/customers`,{
      headers:{
        "x-auth-token":localStorage.getItem("token")
      }
    })
      .then((response) => response.json())
      .then((result) => setCustomers(result));
    let total = 0;
    for (let i in itemList) total += Number(itemList[i].total);
    setGrossTotal(total);
    setGst(Math.ceil(total * 0.18));
    setNetTotal(Math.ceil(total * 1.18));
  }, [inventory, itemList, grossTotal, gst, NetTotal]);

  async function CreateBill() {
    let newBill = {
      customerName,
      billMode,
      creditPeriod,
      items: itemList,
      grossTotal,
      gst,
      NetTotal,
      date: new Date(date).toLocaleDateString(),
    };
    const data = await fetch(`${backendAPI}/billing`, {
      method: "POST",
      body: JSON.stringify(newBill),
      headers: {
        "content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    if (data.status === 401) {
      console.log("error");
    } else {
      const response = await data.json();
      console.log(response);
      alert(`Bill Created Successfully !!!`);
      navigate("/billing");
    }
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Bill Creation
        </span>
        <span>
          <button
            className="btn btn-secondary"
            onClick={() => {}}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            + ADD ITEM
          </button>
          <AddItem
            inventory={inventory}
            units={units}
            handleUnit={handleUnit}
            setQty={setQty}
            AddItemtoBill={AddItemtoBill}
          />
        </span>
      </div>
      <hr />
      <AddBill
        setCreditPeriod={setCreditPeriod}
        billMode={billMode}
        itemList={itemList}
        setCustomerName={setCustomerName}
        setBillMode={setBillMode}
        customers={customers}
        date={date}
        setStartDate={setStartDate}
      />
      {itemList.length !== 0 && (
        <div>
          <div className="position-absolute bottom-0 pb-5 pe-3">
            <button
              className="btn btn-success btn-lg"
              onClick={() => CreateBill()}
            >
              Create Bill
            </button>
          </div>
          <div className="position-absolute bottom-0 end-0 pb-5 pe-3">
            <div className="d-flex flex-column justify-content-center align-items-end">
              <span className="d-flex flex-row gap-2 justify-content-center">
                <label className="form-label fs-5">Gross Amount</label>
                <span className="fs-4">{grossTotal}</span>
              </span>
              <span className="d-flex flex-row gap-2 justify-content-center">
                <label className="form-label fs-5">GST</label>
                <span className="fs-4">{gst}</span>
              </span>
              <span className="d-flex flex-row gap-2 justify-content-center">
                <label className="form-label fs-5">Total Amount</label>
                <span className="fs-4">{NetTotal}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddBill(props) {
  return (
    <div className="form">
      <div className="d-flex flex-row justify-content-between align-items-center gap-2">
        <div className="col-5 form-floating">
          <select
            className="form-select"
            id="floatingSelectGrid"
            onChange={(event) => {
              props.setCustomerName(event.target.value);
            }}
          >
            <option defaultValue="--SelectOne--">--SelectOne--</option>
            {props.customers.map((customer, index) => {
              return (
                <option key={index} defaultValue={customer.customerName}>
                  {customer.customerName}
                </option>
              );
            })}
          </select>
          <label htmlFor="floatingSelectGrid">Customer Name</label>
        </div>
        <div className="col-5 form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            onChange={(event) => {
              props.setBillMode(event.target.value);
            }}
          >
            <option defaultValue="--SelectOne--">--SelectOne--</option>
            <option defaultValue="Cash">Cash</option>
            <option defaultValue="Credit">Credit</option>
          </select>
          <label className="form-label" htmlFor="floatingSelect">
            Billing Mode
          </label>
        </div>
      </div>
      <br />
      <div>
        {props.billMode === "Credit" && (
          <div className="col-5">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelect"
                onChange={(event) => {
                  props.setCreditPeriod(event.target.value);
                  console.log(event.target.value);
                }}
              >
                <option defaultValue="30 days">30 days</option>
                <option defaultValue="45 days">45 days</option>
                <option defaultValue="60 days">60 days</option>
              </select>
              <label className="form-label" htmlFor="floatingSelect">
                Billing Mode
              </label>
            </div>
            <br />
          </div>
        )}
      </div>
      <br />
      <span className="col-5">
        <DatePicker
          selected={props.date}
          onChange={(date) => {
            props.setStartDate(date);
          }}
          dateFormat="dd-MMM-yyyy"
          maxDate={addDays(new Date(), 1)}
          minDate={addDays(new Date(), -1)}
          className="form-content me-2 pt-2 pb-2 rounded"
          id="floatingDateSelect"
        />
      </span>
      <hr />
      <div>
        <div className="container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {[
                  "sl.no.",
                  "Item name",
                  "Quantity",
                  "Units",
                  "Rate",
                  "Amount",
                ].map((element, index) => {
                  return <th key={index}>{element}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {props.itemList.length !== 0 ? (
                props.itemList.map((billItem, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{billItem.name}</td>
                      <td>{billItem.qty}</td>
                      <td>{billItem.units}</td>
                      <td>{billItem.rate}</td>
                      <td>{billItem.total}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AddItem(props) {
  // console.log(props);
  return (
    <>
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
                Add Item
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
                <div className="col-8 form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    defaultValue="Cheese"
                    onChange={(event) =>
                      props.handleUnit(event.target.value.slice(15))
                    }
                  >
                    {props.inventory.map((inventoryItem, index) => {
                      return (
                        <option key={index} defaultValue={inventoryItem._id}>
                          {"item".concat(
                            inventoryItem._id.slice(0, 10),
                            "-",
                            inventoryItem.name
                          )}
                        </option>
                      );
                    })}
                  </select>
                  <label className="form-label" htmlFor="floatingSelect">
                    Item Name
                  </label>
                </div>
              </div>
              <br />
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <div className="col-8 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingLabel"
                    defaultValue={props.units.units}
                  />
                  <label className="form-label" htmlFor="floatingLabel">
                    Units
                  </label>
                </div>
              </div>
              <br />
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <div className="col-8 form-floating">
                  <input
                    className="form-control me-2"
                    id="floatingLabel"
                    type="number"
                    min={props.units.minQuant}
                    step={5}
                    max={props.units.maxQuant}
                    onChange={(event) => {
                      props.setQty(event.target.value);
                    }}
                  />
                  <label className="form-label" htmlFor="floatingLabel">
                    Quantity
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Dismiss
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  props.AddItemtoBill();
                }}
                data-bs-dismiss="modal"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBill;
