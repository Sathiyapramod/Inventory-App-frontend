import React, { useState, useEffect } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { backendAPI } from "../General";

function StockTransfer() {
  const [inventory, setInventory] = useState([]);
  const [updationItem, setUpdationItem] = useState({});
  const [newStock, setNewStock] = useState(0);
  const getInventory = () => {
    fetch(`${backendAPI}/inventory`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setInventory(result);
      });
  };

  function AddStocktoDatabase() {
    const data = { newStock };
    const id = updationItem._id;
    // console.log(data);
    fetch(`${backendAPI}/users/stock/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getInventory();
      });
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center p-3">
        <span className="fs-4">
          <ReceiptIcon /> Stock Transfer
        </span>
        <div className="card">
          <div className="card-body">
            Stock Transfer and Updation on app will be done by Warehouse Team.
            Access for the same is provided to Stores.{" "}
          </div>
        </div>
      </div>
      <hr />
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              {[
                "#",
                "Item Name",
                "Units",
                "Total Quantity",
                "Available Quantity",
                "Billed Quantity",
                "Actions",
              ].map((element, index) => {
                return <th key={index}>{element}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {inventory ? (
              inventory.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.units}</td>
                    <td>{item.totalQty}</td>
                    <td>{item.availableQty}</td>
                    <td>{item.billedQty}</td>
                    <td>
                      {localStorage.getItem("cadreID") == 1 && (
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => {
                            setUpdationItem(item);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Update Stock
                        </button>
                      )}
                      <AddStock
                        updationItem={updationItem}
                        setNewStock={setNewStock}
                        AddStocktoDatabase={AddStocktoDatabase}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No Records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddStock({ updationItem, setNewStock, AddStocktoDatabase }) {
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
              Update Stock for Inventory
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="col-5 form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg me-2"
                  defaultValue={updationItem.totalQty}
                  id="floatingLabel"
                  readOnly
                />
                <label className="form-label" htmlFor="floatingLabel">
                  Total Quantity (Current)
                </label>
              </div>
              <div className="col-5 form-floating">
                <input
                  type="number"
                  min={0}
                  step={10}
                  className="form-control form-control-lg me-2"
                  onChange={(event) => {
                    setNewStock(event.target.value);
                  }}
                  id="floatingLabel"
                />
                <label className="form-label" htmlFor="floatingLabel">
                  Add Stock
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
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                AddStocktoDatabase(updationItem);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockTransfer;
