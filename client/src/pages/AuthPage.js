import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

const AuthPage = () => {
  const { loading, error, request, clearError } = useHttp();
  const { login } = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", form);
      message(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", form);
      console.log(data);
      login(data.token, data.userId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Reduce Links!</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>

            <div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  placeholder="Enter email..."
                  id="email"
                  type="text"
                  name="email"
                  value={form["email"]}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  className="yellow-input"
                  placeholder="Enter password..."
                  id="password"
                  type="password"
                  name="password"
                  value={form["password"]}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "1rem" }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign in
            </button>

            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
