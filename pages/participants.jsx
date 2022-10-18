import axios from "axios";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "../components/dashboard/nav";
import { auth } from "../utils/auth";

export async function getServerSideProps(ctx) {
  const cookie = await auth(ctx);

  if (!cookie || !cookie.token) {
    ctx.res.writeHead(302, { location: "/" });
    ctx.res.end();
    return { props: {} };
  }

  return {
    props: {
      token: cookie.token,
    },
  };
}

function RowParticipantReferralCode({ referral_code }) {
  const [name, setName] = useState("");
  const getData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8888/api/participant/v1/${referral_code}`
      );

      setName(data.data.data.email);
    } catch (error) {
      console.error(
        error?.message ?? error?.repsonse?.data.message ?? "Unknown error"
      );
    }
  };

  useEffect(() => {
    getData();
  });

  return <td className="bg-green-300 flex-1 px-2 py-1">{name}</td>;
}

function Participants({ token }) {
  const [data, setData] = useState([]);

  // mengambil data participant
  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8888/api/participant");

      setData(data.data);
    } catch (error) {
      console.log(
        error?.message ?? error?.repsonse?.data.message ?? "Unknown error"
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Bisnis Indonesia | Participants</title>
        <meta
          name="description"
          content="Participant Event of Bisnis Indonesia"
        />
      </Head>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Bisnis Indonesia ID
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <Nav />
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Referral Code</th>
                    <th scope="col">Used By</th>
                    <th scope="col">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((d, i) => {
                      return (
                        <tr key={i.toString()}>
                          <td>{d.name}</td>
                          <td>{d.email}</td>
                          <td>{d.referral_code}</td>
                          <td>{d.used_by ?? 0}</td>
                          <RowParticipantReferralCode referral_code={d.referrer} />
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Participants;
