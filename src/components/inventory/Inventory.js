import React, { useState, useEffect } from "react";
import { backendAPI } from "../General";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Inventory() {
  const [item, setItem] = useState({});
  const [inventory, setInventory] = useState([]);
  const [itemName, setName] = useState("");
  const [units, setUnits] = useState("grams");
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState(10);

  async function getInventory() {
    const data = await fetch(`${backendAPI}/inventory`);
    if (data.status === 401) {
      console.log("error");
    } else {
      const response = await data.json();
      //   console.log(response);
      setInventory(response);
    }
  }
  async function addNewItem() {
    let newInventory = {
      name: itemName,
      units,
      totalQty: qty,
      rate,
    };
    const data = await fetch(`${backendAPI}/inventory`, {
      method: "POST",
      body: JSON.stringify(newInventory),
      headers: {
        "content-type": "application/json",
      },
    });
    if (data.status === 401) {
      console.log("error");
    } else {
      let response = await data.json();
      console.log(response);
      alert("New Item Added Successfully !!");
      getInventory();
    }
  }
  async function DeleteItem(identity) {
    fetch(`${backendAPI}/inventory/${identity}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        alert("Inventory Deleted");
        getInventory();
      });
  }
  async function EditItem(identity) {
    const updatedItem = {
      name: item.name,
      units: item.units,
      totalQty: item.totalQty,
      billedQty: item.billedQty,
      availableQty: item.availableQty,
      rate,
    };
    // console.log(updatedItem);
    const data = await fetch(`${backendAPI}/inventory/${identity}`, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "content-type": "application/json",
      },
    });
    if (data.status === 401) {
      console.log("Error");
    } else {
      let response = await data.json();
      console.log(response);
      alert("Data Updated Successfully !!");
      getInventory();
    }
  }
  useEffect(() => {
    getInventory();
  }, []);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Warehouse details
        </span>
        <span>
          <button className="btn btn-secondary" onClick={() => getInventory()}>
            Get Inventory Details
          </button>
          <button
            className="btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#AddInventory"
          >
            + Add Item
          </button>
          <AddInventory
            addNewItem={addNewItem}
            setRate={setRate}
            setQty={setQty}
            setName={setName}
            setUnits={setUnits}
          />
        </span>
      </div>
      <hr />
      <div className="container-fluid">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {[
                "Sl.no.",
                "Item-code",
                "Item Name",
                "Units",
                "Total Quantity",
                "Billed Quantity",
                "Available Quantity",
                "Rate",
                "Edit Action",
                "Delete Action",
              ].map((element, index) => {
                return <th key={index}>{element}</th>;
              })}
            </tr>
          </thead>
          {inventory.length !== 0 ? (
            <tbody>
              {inventory.map((item, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{"Item".concat(item._id.slice(0, 10))}</td>
                    <td>{item.name}</td>
                    <td>{item.units}</td>
                    <td>{item.totalQty}</td>
                    <td>{item.billedQty}</td>
                    <td>{item.availableQty}</td>
                    <td>{item.rate}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setItem(item)}
                      >
                        Edit
                      </button>
                    </td>

                    <td>
                      {" "}
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => DeleteItem(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={5}>No Records found</td>
              </tr>
            </tbody>
          )}
        </table>
        <EditInventory item={item} setRate={setRate} EditItem={EditItem} />
      </div>
    </div>
  );
}

function AddInventory(props) {
  return (
    <>
      <div
        className="modal fade modal-lg"
        id="AddInventory"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Inventory
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
                    onChange={(event) => props.setName(event.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <label className="form-label">Units</label>
                <div className="col-5">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    defaultValue="grams"
                    onChange={(event) => {
                      props.setUnits(event.target.value);
                      console.log(event.target.value);
                    }}
                  >
                    <option defaultValue="grams">grams</option>
                    <option defaultValue="lot">lot</option>
                    <option defaultValue="nos">nos</option>
                    <option defaultValue="metre">metre</option>
                    <option defaultValue="quintals">quintals</option>
                    <option defaultValue="sqm">sqm</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <label className="form-label">Quantity</label>
                <div className="col-5">
                  <input
                    className="form-control me-2"
                    type="number"
                    onChange={(event) => {
                      props.setQty(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <label className="form-label">Price</label>
                <div className="col-5">
                  <input
                    className="form-control me-2"
                    type="number"
                    step={5}
                    min={10}
                    onChange={(event) => {
                      props.setRate(event.target.value);
                    }}
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
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => props.addNewItem()}
              >
                Add Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EditInventory(props) {
  // console.log(props);
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Inventory
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h6>Only Rate can be revised !!</h6>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Item Name</label>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control me-2"
                  defaultValue={props.item.name}
                  disabled
                />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Units</label>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control me-2"
                  defaultValue={props.item.units}
                  disabled
                ></input>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Total Quantity</label>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control me-2"
                  defaultValue={props.item.totalQty}
                  disabled
                ></input>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label">Billed Quantity</label>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control me-2"
                  defaultValue={props.item.billedQty}
                  disabled
                ></input>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label"> Available Quantity</label>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control me-2"
                  defaultValue={props.item.availableQty}
                  disabled
                ></input>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <label className="form-label"> Rate</label>
              <div className="col-5">
                <input
                  type="number"
                  className="form-control me-2"
                  min={props.item.rate}
                  defaultValue={props.item.rate}
                  onChange={(event) => props.setRate(event.target.value)}
                ></input>
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
              data-bs-dismiss="modal"
              onClick={() => props.EditItem(props.item._id)}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inventory;
