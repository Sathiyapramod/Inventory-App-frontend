import { useNavigate } from "react-router-dom";

export function Login({ setUsername, setPassword, newSignin }) {
  const navigate = useNavigate();
  return (
    <div className="login mx-auto">
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <div className="form-floating col-6">
          <input
            type="text"
            className="form-control me-2"
            onChange={(event) => setUsername(event.target.value)}
            id="floatingUsername"
          />
          <label htmlFor="floatingUsername">User name</label>
        </div>
        <div className="form-floating col-6">
          <input
            type="password"
            className="form-control me-2"
            onChange={(event) => setPassword(event.target.value)}
            id="floatingPassword"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              newSignin();
            }}
          >
            Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>{" "}
      <br />
      <div className="card">
        <div className="card-body">
          For Demo Purpose &apos; log in with username : 'steve', password :
          '789456'
        </div>
      </div>
    </div>
  );
}
