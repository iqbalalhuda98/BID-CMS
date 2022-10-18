import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
("next/router");
import { cookies } from "../../helpers/cookies";
import { login } from "../../utils/auth";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${process.env.API_URL}/admin/login`,
        data
      );

      if (response.status === 200 && response.data.status === "success") {
        const getProfile = await axios.get("http://localhost:8888/api/admin", {
          headers: {
            authorization: `Bearer ${response.data.data.token}`,
          },
        });

        cookies.set("user", JSON.stringify(getProfile.data.data));
        login(response.data.data.token);
      }
    } catch (error) {
      window.alert(error?.response?.data.message ?? error?.message ?? "Error");
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1em" }}
              >
                <div className="card-body py-1 px-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-3 text-uppercase">Welcome</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your email and password!
                    </p>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        placeholder="Email"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline form-white mb-5">
                      <input
                        type="password"
                        id="typePasswordX"
                        placeholder="Password"
                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={(e) => handleLogin(e)}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FormLogin;
