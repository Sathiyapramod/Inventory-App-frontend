import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../General";
import { Pagination } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "./Billing.css";
import { BillingTable } from "./BillingTable";

export const handlePrint = () => window.print();

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

    const getBillDetails = async () => {
        try {
            const data = await fetch(`${backendAPI}/billing`, {
                headers: {
                    "x-auth-token": localStorage.getItem("token"),
                },
            });
            const response = await data.json();
            if (!response) {
                // ignore
            }
            setBills(response);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getBillDetails();
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
                <BillingTable
                    bills={bills}
                    setBilldetail={setBilldetail}
                    billdetails={billdetails}
                />
            </div>
            {bills.length > 0 ? (
                <Pagination
                    count={3}
                    color="secondary"
                    className="d-flex flex-row justify-content-center mx-auto"
                    page={currentPage}
                    defaultPage={1}
                    onChange={handleChange}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default Billing;
