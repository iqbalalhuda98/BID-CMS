import axios from "axios";
import React from "react";
import Router from "next/router";

function EventCard({ data }) {
  // variabel untuk edit atau mengubah status event
  const activate = async () => {
    const result = await axios.put(
      `http://localhost:8888/api/event/change-active/${data.id}`
    );
    if (result) Router.reload();
  };

  // variabel untuk handle mengubah gambar poster
  const handleEdit = (index) => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      console.log(file);
      let formData = new FormData();
      formData.append("image", file);

      const result = await axios.put(
        `http://localhost:8888/api/image/upload/${data.id}/${index}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Router.reload();
    };

    input.click();
  };

  // variabel handle mengubah gambar logo
  const handleEditLogo = () => {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      console.log(file);
      let formData = new FormData();
      formData.append("image", file);

      const result = await axios.put(
        `http://localhost:8888/api/image/logo/${data.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Router.reload();
    };

    input.click();
  };

  // variabel untuk menghapus event
  const deleteEvent = () => {
    try {
      axios.delete(`http://localhost:8888/api/event/${data.id}`);
      Router.reload();
    } catch (error) {}
  };

  return (
    <div className="container border border-secondary border-1 rounded-3 mb-3">
      <div className="row justify-content-center border-bottom mt-3">
        <div className="col-md-3">
          <h6 className="text-center">Event Name</h6>
          <h5 className="text-center">{data.name}</h5>
        </div>
        <div className="col-md-3">
          <h6 className="text-center">Held on</h6>
          <h5 className="text-center">
            {new Date(data.held).toLocaleDateString()}
          </h5>
        </div>
        <div className="col-md-3">
          <h6 className="text-center">Capacity</h6>
          <h5 className="text-center">{data.capacity} seat</h5>
        </div>
        <div className="col-md-2">
          <div className="d-grid" onClick={activate}>
            {data.isactive ? (
              <button className="btn btn-sm btn-success">Active</button>
            ) : (
              <button className="btn btn-sm btn-warning">Non Active</button>
            )}
          </div>
          <p className="text-center">
            <i>(click to change status)</i>
          </p>
        </div>
      </div>
      <div className="row justify-content-center mt-1">
        <div className="col-md-3 mt-3">
          <div onClick={handleEditLogo}>
            {data.logo ? (
              <img
                className=""
                width="100%"
                src={`http://localhost:8888/api/image/download/${data.logo}`}
              />
            ) : (
              <img className="" width="100%" src="/img/image-logo.png" />
            )}
          </div>
          <p className="text-center mt-1">
            <i>(click image to change)</i>
          </p>
        </div>
      </div>
      <div className="row justify-content-center ms-3 mt-3 mb-4">
        <div className="col-md-3 px-0" onClick={() => handleEdit(1)}>
          {data.image1 ? (
            <img
              className=""
              width="90%"
              src={`http://localhost:8888/api/image/download/${data.image1}`}
            />
          ) : (
            <img className="" width="90%" src="/img/1.png" />
          )}
        </div>
        <div className="col-md-3 px-0" onClick={() => handleEdit(2)}>
          {data.image2 ? (
            <img
              className=""
              width="90%"
              src={`http://localhost:8888/api/image/download/${data.image2}`}
            />
          ) : (
            <img className="" width="90%" src="/img/2.png" />
          )}
        </div>
        <div className="col-md-3 px-0" onClick={() => handleEdit(3)}>
          {data.image3 ? (
            <img
              className=""
              width="90%"
              src={`http://localhost:8888/api/image/download/${data.image3}`}
            />
          ) : (
            <img className="" width="90%" src="/img/3.png" />
          )}
        </div>
        <div className="col-md-3 px-0" onClick={() => handleEdit(4)}>
          {data.image4 ? (
            <img
              className=""
              width="90%"
              src={`http://localhost:8888/api/image/download/${data.image4}`}
            />
          ) : (
            <img className="" width="90%" src="/img/4.png" />
          )}
        </div>
        <p className="text-center mt-1 mb-0">
          <i>(click image to change)</i>
        </p>
      </div>
      {/* <div className="mb-3">
        <button className="btn btn-warning" onClick={deleteEvent}>
          Delete
        </button>
      </div> */}
    </div>
  );
}

export default EventCard;
