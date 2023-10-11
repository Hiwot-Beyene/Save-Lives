import React from "react";
// import "./singleblog.css";
export default function SingleBlog(prop) {
  const { username, comment } = prop.prop;

  console.log(username, comment);
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="user d-flex flex-row align-items-center">
          <img
            src="https://i.imgur.com/hczKIze.jpg"
            width="30"
            alt=""
            class="user-img rounded-circle mr-2"
          />
          <small className="font-weight-bold text-primary">{username}</small>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "10px",
              textDecoration: "italic",
            }}
          >
            <small className="font-weight-bold">
              <i>{comment}</i>
            </small>
          </span>
        </div>
      </div>
    </div>
  );
}
