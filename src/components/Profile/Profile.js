import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Profile({ user }) {
  return (
    <div>
      {localStorage.getItem("token") && (
        <div>
          <div className="d-flex flex-row justify-content-between align-items-center p-3">
            <span className="fs-4">
              <ReceiptIcon /> Profile Details
            </span>
            <span>
              <button className="btn btn-secondary">View Profile </button>
            </span>
          </div>
          <hr />
          <div>
            <div>
              <div className="d-flex flex-row justify-content-between align-items-center ps-2 pe-2">
                <div className="form-floating">
                  <input
                    type="text"
                    id="floatingSelectGrid"
                    className="form-control me-2"
                    defaultValue={user.username.toUpperCase()}
                    readOnly
                  />
                  <label htmlFor="floatingSelectGrid">Employee Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    id="floatingSelectGrid"
                    className="form-control me-2"
                    defaultValue={user.jobRole.toUpperCase()}
                    readOnly
                  />
                  <label htmlFor="floatingSelectGrid">Designation</label>
                </div>
              </div>
              <br />
              <div className="card">
                <div className="card-header fw-bolder">Access Matrix</div>
                <div>
                  {user.jobRole != 5 && (
                    <table className="table table-striped table-hovered">
                      <thead>
                        <tr>
                          {[
                            "#",
                            "Description",
                            "Creation",
                            "Authorize",
                            "Scrutiny",
                            "Approval",
                          ].map((element, index) => {
                            return <th key={index}>{element}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Inventory</td>
                          <td>{user.jobRole == "stores" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole !== "stores" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "accounts" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "unit head" ? "✔️" : "❌"}</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Purchase Order</td>
                          <td>{user.jobRole == "stores" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole !== "stores" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "accounts" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "unit head" ? "✔️" : "❌"}</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Billing</td>
                          <td>{user.jobRole === "manager" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "manager" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "accounts" ? "✔️" : "❌"}</td>
                          <td>{user.jobRole === "unit head" ? "✔️" : "❌"}</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
