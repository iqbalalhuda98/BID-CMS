import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "../components/dashboard/nav";

function Participants(props) {
  const [name, setName] = useState("");
  const [held, setHeld] = useState("");
  const [capacity, setCapacity] = useState("");

  // variabel handle membuat event baru
  const createEvent = async () => {
    const res = await axios.post(`http://localhost:8888/api/event`, {
      name,
      held,
      capacity,
    });

    alert("Event Created");
    Router.push("/events");
  };
  
  return (
    <div>
      <Head>
        <title>Bisnis Indonesia | Create Events</title>
        <meta name="description" content="Create Event Bisnis Indonesia" />
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
            <div className="d-flex justify-content-center align-items-center pt-3 pb-2 mb-3 border-bottom">
              <form>
                <h2>Create Event</h2>
                <div className="row">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Event Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Held on
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setHeld(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Capacity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="Your Event Capacity"
                    />
                  </div>
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary" onClick={createEvent}>
                      Add Event
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Participants;
