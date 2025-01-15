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
        const data = await fetch(`${backendAPI}/inventory`, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        });
        if (data.status === 401) {
            console.log("error");
        } else {
            const response = await data.json();

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
                "x-auth-token": localStorage.getItem("token"),
            },
        });
        if (data.status === 401) {
            console.log("error");
        } else {
            let response = await data.json();

            alert("New Item Added Successfully !!");
            getInventory();
        }
    }
    async function DeleteItem(identity) {
        fetch(`${backendAPI}/inventory/${identity}`, {
            method: "DELETE",
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
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

        const data = await fetch(`${backendAPI}/inventory/${identity}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
                "content-type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
            },
        });
        if (data.status === 401) {
            console.log("Error");
        } else {
            let response = await data.json();

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
                    {/* <button className="btn btn-secondary" onClick={() => getInventory()}>
            Get Inventory Details
          </button> */}
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
                                <td colSpan={10}>No Records found</td>
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
            <div className="modal fade modal-lg" id="AddInventory" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
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
                        <div className="modal-body bg-light">
                            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                                <div className="col-5 form-floating">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg me-2"
                                        id="floatingLabel"
                                        onChange={(event) => props.setName(event.target.value)}
                                    />
                                    <label className="form-label" htmlFor="floatingLabel">
                                        Item Name
                                    </label>
                                </div>
                                <div className="col-5 form-floating">
                                    <select
                                        className="form-select form-select-lg me-2"
                                        id="floatingSelect"
                                        defaultValue="Select-One"
                                        onChange={(event) => {
                                            props.setUnits(event.target.value);
                                        }}
                                    >
                                        <option defaultValue="Select-One">--Select-One--</option>
                                        <option defaultValue="grams">grams</option>
                                        <option defaultValue="lot">lot</option>
                                        <option defaultValue="nos">nos</option>
                                        <option defaultValue="metre">metre</option>
                                        <option defaultValue="quintals">quintals</option>
                                        <option defaultValue="sqm">sqm</option>
                                    </select>
                                    <label className="form-label" htmlFor="floatingSelect">
                                        Units
                                    </label>
                                </div>
                            </div>
                            <br />
                            <div className="d-flex flex-row justify-content-center align-items-center gap-5">
                                <div className="col-2 form-floating">
                                    <input
                                        className="form-control form-control-lg me-2"
                                        type="number"
                                        id="floatingLabel"
                                        onChange={(event) => {
                                            props.setQty(event.target.value);
                                        }}
                                    />
                                    <label className="form-label" htmlFor="floatingLabel">
                                        Quantity
                                    </label>
                                </div>
                                <div className="col-5 form-floating">
                                    <input
                                        className="form-control form-control-lg me-2"
                                        type="number"
                                        id="floatingLabel"
                                        step={5}
                                        min={10}
                                        onChange={(event) => {
                                            props.setRate(event.target.value);
                                        }}
                                    />
                                    <label className="form-label" htmlFor="floatingLabel">
                                        Price
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
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Edit Inventory - {props.item.name}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h5>Note: Only Rate can be revised !!</h5>
                        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                            <div className="col-5 form-floating">
                                <input
                                    type="text"
                                    id="floatingInputDisabled"
                                    className="form-control"
                                    defaultValue={props.item.name}
                                    readOnly
                                />
                                <label htmlFor="floatingInputDisabled">Item Name</label>
                            </div>
                            <div className="col-5 form-floating">
                                <input
                                    type="text"
                                    id="floatingreadonly"
                                    className="form-control me-2"
                                    defaultValue={props.item.units}
                                    readOnly
                                />
                                <label className="form-label" htmlFor="floatingreadonly">
                                    Units
                                </label>
                            </div>
                        </div>
                        <br />
                        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                            <div className="col-3 form-floating">
                                <input
                                    type="text"
                                    id="floatingreadonly"
                                    className="form-control me-2"
                                    defaultValue={props.item.totalQty}
                                    readOnly
                                />
                                <label className="form-label" htmlFor="floatingreadonly">
                                    Total Quantity
                                </label>
                            </div>
                            <div className="col-3 form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={props.item.billedQty}
                                    readOnly
                                />
                                <label className="form-label">Billed Quantity</label>
                            </div>
                            <div className="col-3 form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    id="floatingLabel"
                                    defaultValue={props.item.availableQty}
                                    readOnly
                                />
                                <label className="form-label" htmlFor="floatingLabel">
                                    {" "}
                                    Available Quantity
                                </label>
                            </div>
                        </div>
                        <br />
                        <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                            <div className="col-3 form-floating">
                                <input
                                    type="number"
                                    id="floatingLabel"
                                    className="form-control form-control-lg me-2"
                                    min={props.item.rate}
                                    defaultValue={props.item.rate}
                                    step={10}
                                    onChange={(event) => props.setRate(event.target.value)}
                                />
                                <label className="form-label" htmlFor="floatingLabel">
                                    Rate(₹)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
