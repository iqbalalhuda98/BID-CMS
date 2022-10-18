import Head from "next/head";
import Nav from "../components/dashboard/nav";
import EventCard from "../components/dashboard/event-card";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
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

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  // mengambil data event
  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:8888/api/event");

      setData(result.data.data);
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
        <title>Bisnis Indonesia | Events</title>
        <meta name="description" content="List of Event Bisnis Indonesia" />
      </Head>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Bisnis Indonesia ID
        </a>
        <button
          className="navbar-toggler d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              Sign out
            </a>
          </div>
        </div> */}
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <Nav open={open} />
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <div className="px-1">
                <Link href="/create-event" passHref>
                  <a className="btn btn-primary">Add Event</a>
                </Link>

                {/* memanggil components event-card */}
                <div className="row mt-4">
                  {data &&
                    data.map((d, i) => {
                      return <EventCard key={i} data={d} />;
                    })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
