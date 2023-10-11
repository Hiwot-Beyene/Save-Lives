import React from "react";
import { NavLink } from "react-router-dom";
import "./admin.css";
import adminImg from "./image/user2-160x160.jpg";
export default function SharedAdminLayer() {
  const username = localStorage.getItem("username");
  return (
    <div style={{ height: "100vh", backgroundColor: "brown", width: "200px" }}>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <h3 style={{ marginLeft: "10px" }}>
            <i className="fa fa-stethoscope"></i>
            <span style={{ color: "greenyellow", fontSize: "20px" }}>Save</span>
            <span
              style={{
                color: "white",
                fontSize: "20px",
              }}
            >
              lives
            </span>
          </h3>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={adminImg}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <div style={{ color: "white" }} className="d-block">
                {username ? username : "Admin"}
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item has-treeview menu-open">
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="/admin" className="nav-link active">
                      <p style={{ fontSize: "23px", color: "black" }}>
                        Admin Home
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <li className="nav-item">
                  <NavLink to="/admin/approvedpatients" className="nav-link">
                    <i className="nav-icon fa fa-user"></i>
                    <p>Approved Patients</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/patients" className="nav-link">
                    <i className="fa fa-list nav-icon"></i>
                    <p>Patient List</p>
                  </NavLink>
                </li>
              </li>
              <li className="nav-item has-treeview">
                <li className="nav-item">
                  <NavLink to="blogs" className="nav-link">
                    <i className="fa fa-comment nav-icon"></i>
                    <p>Blog</p>
                  </NavLink>
                </li>
              </li>
              <li className="nav-item has-treeview">
                <li className="nav-item">
                  <NavLink to="users" className="nav-link">
                    <i class="fa fa-user nav-icon" aria-hidden="true"></i>
                    <p>Users</p>
                  </NavLink>
                </li>
              </li>
              <li className="nav-item has-treeview">
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    onClick={() => {
                      localStorage.removeItem("jwt");
                    }}
                    className="btn btn-lg btn-light"
                    style={{
                      position: "fixed",
                      bottom: "0px",
                      color: "black",
                      left: "-10px",
                      width: "260px",
                      borderRadius: "none",
                      // margin: "0px",
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
