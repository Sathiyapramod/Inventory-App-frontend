import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? (
        <div>{children}</div>
    ) : (
        <div>
            <Navigate replace to="/" />
        </div>
    );
}
