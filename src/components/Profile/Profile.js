import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Profile({ user }) {
  return (
    <div>
      {localStorage.getItem("token") && (
        <div>
          <div className="d-flex flex-row justify-content-between align-items-center p-3">
            <span className="fs-4">
              <ReceiptIcon /> View Profile
            </span>
            <hr />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="d-flex flex-row justify-content-center align-items-center gap-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control me-2"
                defaultValue={user.username}
                disabled
              />
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control me-2"
                defaultValue={user.jobRole}
                disabled
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
