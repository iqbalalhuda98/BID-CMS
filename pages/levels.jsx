import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { auth, logout } from "../utils/auth";
import Nav from "../components/dashboard/nav";
import usePreviousState from "../hooks/usePreviousState";

const apiUrl = "http://localhost:8888/api";

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

export default function ReferralLevels({ token }) {
  const [levels, setLevels] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [formState, setFormState] = useState({
    level: 0,
    range: "",
  });

  const prevFormState = usePreviousState(formState);

  // Fungsi untuk mendapatkan data referral level
  const getReferralLevels = async () => {
    try {
      const response = await axios.get(`${apiUrl}/level`);

      setLevels(response.data.data);
    } catch (error) {
      console.error(
        error?.message ?? error?.response.data.message ?? "Unknown error"
      );
    }
  };

  const handleOpenModalEdit = (id) => {
    setEditId(id);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const range = name === "range" && value.replaceAll(" ", "");

    setFormState({
      ...formState,
      [name]: name === "range" ? range : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${apiUrl}/level/${editId}`, formState);

      window.alert("Successfully updated");
      setEditId(null);
      getReferralLevels();
    } catch (error) {
      setEditId(null);
      console.error(
        error?.message ?? error?.response.data.message ?? "Unknown error"
      );
    }
  };

  const handleAddNewLevel = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/level`, formState);

      window.alert("Successfully added");
      getReferralLevels();
      setOpenModal(false);
    } catch (error) {
      setOpenModal(false);
      console.error(
        error?.message ?? error?.response.data.message ?? "Unknown error"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/level/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.alert("Successfully deleted");
      getReferralLevels();
    } catch (error) {
      console.error(
        error?.message ?? error?.response.data.message ?? "Unknown error"
      );
    }
  };

  useEffect(() => {
    getReferralLevels();
  }, []);

  useEffect(() => {
    const level = levels.find((level) => level.id === editId);

    setFormState({
      level: level?.level,
      range: level?.range,
    });
  }, [editId]);

  useEffect(() => {
    // Reset form state jika data referral level berubah
    setFormState({
      level: 0,
      range: "",
    });
  }, [levels]);

  return (
    <div>
      <Head>
        <title>Bisnis Indonesia | Referral Levels</title>
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
            <div className="p-4">
              <div className="mb-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setOpenModal(true)}
                >
                  Add Level
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Options</th>
                    <th scope="col">Level</th>
                    <th scope="col">Range</th>
                  </tr>
                </thead>
                <tbody>
                  {levels.length > 0 &&
                    levels.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleOpenModalEdit(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>{item.level}</td>
                        <td>
                          {item.range.split("-")[0]} -{" "}
                          {item.range.split("-")[1]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      {editId && (
        <div className="custom-modal-container">
          <div
            className="custom-modal-bg"
            onClick={() => setEditId(null)}
          ></div>
          <form onSubmit={handleSave} className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="fw-bold">Edit Referral Level</h5>
            </div>
            <div className="custom-modal-body">
              <div className="mb-3">
                <label htmlFor="level" className="form-label">
                  Level
                </label>
                <input
                  type="number"
                  autoFocus
                  id="level"
                  name="level"
                  value={formState.level}
                  className="form-control"
                  onChange={handleOnChange}
                  placeholder="Level"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="range" className="form-label">
                  Range
                </label>
                <input
                  type="text"
                  name="range"
                  id="range"
                  value={formState.range}
                  pattern="[0-9]{1,5}-[0-9]{1,5}"
                  className="form-control"
                  onChange={handleOnChange}
                  placeholder="ex: 0-10"
                />
              </div>
            </div>

            <div className="custom-modal-footer">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {openModal && (
        <div className="custom-modal-container">
          <div
            className="custom-modal-bg"
            onClick={() => setOpenModal(false)}
          ></div>
          <form onSubmit={handleAddNewLevel} className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="fw-bold">Add Referral Level</h5>
            </div>
            <div className="custom-modal-body">
              <div className="mb-3">
                <label htmlFor="level" className="form-label">
                  Level
                </label>
                <input
                  type="number"
                  autoFocus
                  id="level"
                  name="level"
                  value={formState.level}
                  className="form-control"
                  onChange={handleOnChange}
                  placeholder="Level"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="range" className="form-label">
                  Range
                </label>
                <input
                  type="text"
                  name="range"
                  id="range"
                  value={formState.range}
                  pattern="[0-9]{1,5}-[0-9]{1,5}"
                  className="form-control"
                  onChange={handleOnChange}
                  placeholder="ex: 0-10"
                />
              </div>
            </div>

            <div className="custom-modal-footer">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
