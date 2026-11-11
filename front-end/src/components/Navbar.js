import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-5">
    <div className="container-fluid">
      <NavLink className="navbar-brand text-success fw-bold" to="/">
        BerkahStore
      </NavLink>
      <div className="navbar-nav">
        <NavLink className="nav-link" to="/">
          Beranda
        </NavLink>
        <NavLink className="nav-link" to="/cart">
          Keranjang
        </NavLink>
        <NavLink className="nav-link" to="/orders">
          Riwayat Pesanan
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
