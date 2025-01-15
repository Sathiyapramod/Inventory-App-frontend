import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../General";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jobRole, setJobrole] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const Register = () => {
    const newUser = {
      username,
      password,
      jobRole,
      email,
    };

    fetch(`${backendAPI}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        navigate("/");
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5 ">
      <span className="fs-2">Register with Us. !!</span>
      <div className="form-floating">
        <input
          type="text"
          className="form-control me-2"
          id="floatingLabel"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className="form-label" htmlFor="floatingLabel">
          Username
        </label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control me-2"
          id="floatingLabel"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label className="form-label" htmlFor="floatingLabel">
          Password
        </label>
      </div>
      <div className="d-flex flex-row justify-content-around align-items-center gap-5">
        <div className="form-floating">
          <select
            className="form-control me-2 col-5"
            onChange={(event) => setJobrole(event.target.value)}
          >
            <option defaultValue="stores">stores</option>
            <option defaultValue="accounts">accounts</option>
            <option defaultValue="manager">manager</option>
            <option defaultValue="unit head">head</option>
          </select>
          <label className="form-label" htmlFor="floatingLabel">
            Job Role
          </label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control me-2"
            id="floatingLabel"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="form-label" htmlFor="floatingLabel">
            Email ID
          </label>
        </div>
      </div>
      <button className="btn btn-outline-primary" onClick={() => Register()}>
        Register
      </button>
      <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
        Go to Home Page
      </button>
    </div>
  );
}
