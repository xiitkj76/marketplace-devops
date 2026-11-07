import React, { useState } from 'react';

const Navbar = () => {
  // State untuk mengelola status login dan nama pengguna
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('John Doe'); // Nama pengguna yang sudah login

  // Fungsi untuk login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName('Jane Doe'); // Nama pengguna yang login
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-5">
      <div className="container-fluid">
        {/* Nama Toko */}
        <h1>
            <a className="navbar-brand text-success " href="/">
         BerkahStore 
        </a>
        </h1>

        <div className="d-flex align-items-center">
          {/* Tampilkan nama pengguna jika sudah login */}
          {isLoggedIn ? (
            <span className="navbar-text me-3">
              Welcome, {userName}
            </span>
          ) : null}

          {/* Tombol Login atau Logout */}
          {isLoggedIn ? (
            <button className="btn btn-success col-auto" onClick={handleLogout}>
             <b> Logout</b>
            </button>
          ) : (
            <button className="btn border border-success text-success" onClick={handleLogin}>
              <b>Login</b>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


