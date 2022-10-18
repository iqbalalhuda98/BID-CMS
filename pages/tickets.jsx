import axios from "axios";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "../components/dashboard/nav";

function RowEvent({ id }) {
  const [name, setName] = useState("");

  const getData = async () => {
    try {
      const data = await axios.get(`http://localhost:8888/api/event/${id}`);

      setName(data.data.data[0].name);
    } catch (error) {
      console.error(
        error?.message ?? error?.repsonse?.data.message ?? "Unknown error"
      );
    }
  };

  useEffect(() => {
    getData();
  });

  return <td className="bg-blue-300 flex-1 px-2 py-1">{name}</td>;
}

function RowParticipant({ id }) {
  const [name, setName] = useState("");
  const getData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8888/api/participant/${id}`
      );

      setName(data.data.data.name);
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

function RowParticipantEmail({ id }) {
  const [name, setName] = useState("");
  const getData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8888/api/participant/${id}`
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

function Participants(props) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const ticket = await axios.get("http://localhost:8888/api/ticket");

      setData(ticket.data.data);
    } catch (error) {
      console.error(
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
        <title>Bisnis Indonesia | Tickets</title>
        <meta name="description" content="Tickets of Event Bisnis Indonesia" />
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
                    <th scope="col">Participant Name</th>
                    <th scope="col">Participant Email</th>
                    <th scope="col">Event name</th>
                    <th scope="col">Order time</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((d, i) => (
                      <tr key={i.toString()}>
                        <RowParticipant id={d.participant} />
                        <RowParticipantEmail id={d.participant} />
                        <RowEvent id={d.event} />
                        <td>{new Date(d.time_order).toLocaleString()}</td>
                      </tr>
                    ))}
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
