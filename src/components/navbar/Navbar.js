import React from "react";
import "./Navbar.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

function Navbar({ user }) {
    const navigate = useNavigate();
    return (
        <div className="navbar bg-light d-flex flex-row-reverse">
            {localStorage.getItem("token") && (
                <div className="d-flex flex-row-reverse justify-content-center align-items-center gap-2">
                    <span>
                        <button
                            className="btn"
                            onClick={() => {
                                localStorage.clear();
                                alert("Logged out successfully !!!");
                                navigate("/");
                            }}
                        >
                            <ExitToAppIcon /> Sign Out
                        </button>
                    </span>
                    <span className="ps-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <span className="fs-5 fw-bolder text-uppercase">
                            {user?.username ?? ""}
                        </span>
                        <span className="fs-6 text-uppercase">{user?.jobRole ?? ""}</span>
                    </span>
                    <span className="ps-2">
                        <Avatar alt="profile-pic">
                            {user?.username?.slice(0, 1).toUpperCase()}
                        </Avatar>
                    </span>
                    <span className="ps-2">
                        <button className="btn">
                            <Badge color="secondary" variant="dot" overlap="circular">
                                <NotificationsRoundedIcon />
                            </Badge>
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
}

export default Navbar;
