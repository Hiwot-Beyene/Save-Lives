import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
export default function YourPost() {
  const [deleted, setDelete] = useState({ truth: false, msg: "" });

  const handleDelete = async () => {
    const jwt = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");

    const response = await axios.delete(
      `http://localhost:8888/api/user/pendingpost/${username}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    console.log(response.data);
    const { success, msg } = response.data;
    if (success) {
      setProblem({ error: false, msg: msg, status: "No post" });

      return;
    }

    return;
  };
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    error: false,
    msg: "",
    status: "",
    post: {},
  });
  const fetchPost = async () => {
    const jwt = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");

    const response = await axios.get(
      `http://localhost:8888/api/user/post/${username}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success, msg, post, status } = response.data;
    if (!success) {
      setProblem({ error: false, msg: msg, status: "No post" });
      return;
    } else {
      setProblem({ error: true, msg: "", status: status, post: post });
      return;
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <section style={{ marginTop: "100px" }}>
        <button
          style={{ marginLeft: "100px" }}
          onClick={() => {
            navigate("/updateprofile");
          }}
          className="btn btn-primary "
        >
          Update Profile
        </button>
        <button
          style={{ marginLeft: "100px" }}
          onClick={() => {
            navigate("/yourpost");
          }}
          className="btn btn-primary "
        >
          Your Post
        </button>
      </section>

      {problem.error ? (
        <div className="box-container" style={{ marginTop: "100px" }}>
          <div className="box" style={{ width: "300px" }}>
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                marginRight: "20px",
                borderRadius: "10px",
              }}
            >
              Name
            </div>
            <div className="btn"> {problem.post.username} </div>

            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              Age
            </div>
            <div className="btn">{problem.post.age}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              condition
            </div>
            <div className="btn">{problem.post.disease}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              Gender
            </div>
            <div className="btn">{problem.post.gender}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              Money Asked
            </div>
            <div className="btn">{problem.post.moneyAsked} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              moneyPaid
            </div>
            <div className="btn"> {problem.post.paidAmount} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                marginRight: "20px",
                borderRadius: "10px",
              }}
            >
              hospitalName
            </div>

            <div className="btn"> {problem.post.hospitalName}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              Hospital Account
            </div>
            <div className="btn">{problem.post.hospitalAccount} </div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              Due Date
            </div>
            <div className="btn">{problem.post.dueDate}</div>
            <br />
            <br />
            <div
              className="btn"
              style={{
                backgroundColor: "aqua",
                marginLeft: "40px",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              Post Status
            </div>
            <div className="btn">{problem.status} </div>
            <br />
            <br />

            {problem.status === "Pending" ? (
              <button
                className="btn"
                onClick={handleDelete}
                style={{
                  backgroundColor: "red",
                  marginLeft: "50px",
                  borderRadius: "10px",
                  marginRight: "20px",
                  width: "200px",
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Delete Post
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <h1
          className="box-container"
          style={{ marginTop: "100px", color: "red" }}
        >
          No post available
        </h1>
      )}
    </>
  );
}
