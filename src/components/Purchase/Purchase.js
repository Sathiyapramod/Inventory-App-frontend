import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../General";
import { TABLE_PO } from "../../helpers/constants";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Purchase() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderItems, setItem] = useState({});
    const getOrders = () => {
        fetch(`${backendAPI}/purchase`, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        })
            .then((response) => response.json())
            .then((result) => setOrders(result));
    };
    useEffect(() => {
        getOrders();
    }, []);
    let Role = localStorage.getItem("jobRole");
    return (
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center p-3">
                <span className="fs-4">
                    <ReceiptIcon /> Purchase Orders
                </span>
                <span>
                    {Role !== "stores" ? (
                        <button className="btn btn-success" disabled>
                            + Create PO
                        </button>
                    ) : (
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                navigate("/purchaseorder/create");
                            }}
                        >
                            + Create PO
                        </button>
                    )}
                </span>
            </div>
            <hr />
            <div className="bg-light rounded-2">
                <table className="table table-striped table-hovered bg-white">
                    <thead>
                        <tr>
                            {TABLE_PO.map((heading, index) => {
                                return <th key={index}>{heading}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.date.slice(0, 10)}</td>
                                    <td>{element.vendorName}</td>
                                    <td>{element.grossTotal}</td>
                                    <td>{element.gst}</td>
                                    <td>{element.NetAmount}</td>
                                    <td>
                                        {element.isApproved === 1 &&
                                        element.isScrutinized === 1 &&
                                        element.isAuthorized === 1
                                            ? "Approved"
                                            : ""}
                                        {element.isApproved === 0 &&
                                        element.isScrutinized === 1 &&
                                        element.isAuthorized === 1
                                            ? "Scrutinized"
                                            : ""}
                                        {element.isApproved === 0 &&
                                        element.isScrutinized === 0 &&
                                        element.isAuthorized === 1
                                            ? "Authorized"
                                            : ""}
                                        {element.isApproved === 0 &&
                                        element.isScrutinized === 0 &&
                                        element.isAuthorized === 0
                                            ? "Created"
                                            : ""}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-dark"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => setItem(element)}
                                        >
                                            View PO
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ViewPurchaseOrder orderItems={orderItems} />
            </div>
        </div>
    );
}
function ViewPurchaseOrder({ orderItems }) {
    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Purchase Order Details - {orderItems._id}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body pb-3">
                        <div className="d-flex flex-row justify-content-between align-items-center p-2 gap-5">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={orderItems.vendorName}
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Vendor Name</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={orderItems.date}
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Date of Creation</label>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center p-2 gap-5">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={orderItems.grossTotal}
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Amount Excl. Taxes (₹)</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={orderItems.gst}
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">GST</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={orderItems.NetAmount}
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Amount Incl. Taxes (₹)</label>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between  align-items-center p-2 gap-5 pb-5">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={
                                        orderItems.isAuthorized == 0 ? "Awaiting" : "Cleared"
                                    }
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Authorization Status </label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={
                                        orderItems.isScrutinized == 0 ? "Awaiting" : "Cleared"
                                    }
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Scrutiny </label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    defaultValue={
                                        orderItems.isApproved == 0 ? "Awaiting" : "Cleared"
                                    }
                                    id="floatingTextarea"
                                />
                                <label htmlFor="floatingTextarea">Approval </label>
                            </div>
                        </div>
                        <div>
                            <table className="table table-striped table-hovered table-bordered">
                                <thead>
                                    <tr className="table-grey">
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>UOM</th>
                                        <th>Order Quantity</th>
                                        <th>Basic Price</th>
                                        <th>Amount Excl. Taxes(₹) </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.POItems ? (
                                        orderItems.POItems.map((element, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{element.itemName}</td>
                                                    <td>{element.units}</td>
                                                    <td>{element.quantity}</td>
                                                    <td>{element.rate}</td>
                                                    <td>{element.total}</td>
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
                        <div>
                            <div className="d-flex flex-column ">
                                <span className="d-flex flex-row justify-content-end align-items-center gap-2 pe-3 fs-5">
                                    <span>Base Amount </span>
                                    <span>₹{orderItems.grossTotal}</span>
                                </span>
                                <span className="d-flex flex-row justify-content-end align-items-center gap-2 pe-3 fs-5">
                                    <span>GST </span>
                                    <span>₹{orderItems.gst}</span>
                                </span>
                                <span className="d-flex flex-row justify-content-end align-items-center gap-2 pe-3 fs-5">
                                    <span>Total Amount </span>
                                    <span>₹{orderItems.NetAmount}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Purchase;
