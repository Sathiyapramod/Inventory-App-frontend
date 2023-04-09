import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AssessmentTwoToneIcon from "@mui/icons-material/AssessmentTwoTone";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import PaidIcon from "@mui/icons-material/Paid";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import { Divider } from "@mui/material";
import "./Appbar.css";
import { Link } from "react-router-dom";
import { LinkStyling } from "../General";

function Appbar() {
  const [flag, setFlag] = useState(true);
  const sidebar = {
    width: flag ? "250px" : "120px",
    // height: "100vh",
    minHeight: "100vh",
    padding: "1rem 0 0 0",
    transition: "width 0.9s",
  };
  return (
    <div style={sidebar} className="bg-dark text-white">
      <span>
        <button className="btn" onClick={() => setFlag(!flag)}>
          {flag ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
        </button>
      </span>
      <br />
      <span className="sidebar-logo">{flag ? <>Rampage</> : <>❤</>}</span>
      <br />
      <br />
      <div className="d-flex flex-column gap-4 justify-content-center align-items-start ps-0 sidebar-menu">
        {flag ? (
          <Link to="/dashboard" style={LinkStyling}>
            <span className="sidebar-menu-items ps-3">
              <DashboardCustomizeIcon /> Dashboard
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/dashboard" style={LinkStyling}>
              <DashboardCustomizeIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}{" "}
        {flag ? (
          <Link to="/customers" style={LinkStyling}>
            <span className="sidebar-menu-items ps-3">
              <HandshakeIcon /> Customer
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/customers" style={LinkStyling}>
              <HandshakeIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
        {flag ? (
          <Link to="/billing" style={LinkStyling}>
            <span className="sidebar-menu-items ps-3">
              <ReceiptIcon /> Billing
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/billing" style={LinkStyling}>
              <ReceiptIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
        {flag ? (
          <Link to="/workflow" style={LinkStyling}>
            <span className="sidebar-menu-items ps-3">
              <AssessmentTwoToneIcon /> Workflow
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/workflow" style={LinkStyling}>
              <AssessmentTwoToneIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
        {flag ? (
          <Link to="/profile" style={LinkStyling}>
            <span className="sidebar-menu-items ps-3">
              <PermContactCalendarIcon /> Profile
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/profile" style={LinkStyling}>
              <PermContactCalendarIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
      </div>{" "}
      <br />
      <Divider />
      <span className="d-flex flex-column gap-4 justify-content-center align-items-start text-secondary ps-0">
        {flag ? (
          <Link to="/warehouse" style={LinkStyling}>
            <span className="sidebar-submenu-items ps-3">
              <WarehouseIcon /> Warehouse{" "}
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/warehouse" style={LinkStyling}>
              <WarehouseIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
        {flag ? (
          <Link to="/purchaseorder" style={LinkStyling}>
            <span className="sidebar-submenu-items ps-3">
              <PaidIcon /> Purchase Order{" "}
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/purchaseorder" style={LinkStyling}>
              <PaidIcon sx={{ fontSize: 40, "&:hover": { color: "grey" } }} />
            </Link>
          </span>
        )}
        {flag ? (
          <Link to="/transfer" style={LinkStyling}>
            <span className="sidebar-submenu-items ps-3">
              <InventorySharpIcon /> Transfer{" "}
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/transfer" style={LinkStyling}>
              <InventorySharpIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
        {flag ? (
          <Link to="/payment" style={LinkStyling}>
            <span className="sidebar-submenu-items ps-3">
              <CurrencyRupeeSharpIcon /> Payment{" "}
            </span>
          </Link>
        ) : (
          <span className="mx-auto">
            <Link to="/payment" style={LinkStyling}>
              <CurrencyRupeeSharpIcon
                sx={{ fontSize: 40, "&:hover": { color: "grey" } }}
              />
            </Link>
          </span>
        )}
      </span>
      <Divider />
    </div>
  );
}

export default Appbar;
