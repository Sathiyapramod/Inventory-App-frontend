import React from "react";
import { ViewBilldetail } from "./ViewBilldetail";
import { TABLE_BILLING } from "../../helpers/constants.js";

export function BillingTable({ bills, setBilldetail, billdetails }) {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    {TABLE_BILLING.map((element, index) => {
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
                                <td>{new Date(billItem.date).toLocaleDateString("hi-IN")}</td>
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
                        <td colSpan={10}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
