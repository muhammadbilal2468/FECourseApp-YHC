import React from "react";
import { bilalImg } from "../assets";
import { Outlet } from "react-router";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="header">
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <p className="logo">Bilal Course</p>
        </Link>
        <div className="user">
          <img src={bilalImg} alt="" />
          <p className="name">Ardi</p>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
