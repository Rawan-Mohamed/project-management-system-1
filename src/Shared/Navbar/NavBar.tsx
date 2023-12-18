import React from 'react'
import logo from "../../assets/images/navLogo.png"
import avatar from "../../assets/images/avatar.png"
export default function NavBar({userData}) {
  return (
    <nav className="navbar navbar-expand-lg nav-bg bg-light p-0 ">
    <div className="container-fluid ">
      <img src={logo}   alt="" />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link text-black" href="#">
                  {/* Bell Icon with Badge */}
            <i className="fas fa-bell ms-2 position-relative">
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                3
              </span>
            </i>
              <img src={avatar} className='m-2 rounded-circle' alt='user-image' />
              {/* {userData?.userName || "user"} */}
              <span className="d-none d-lg-inline">{userData?.userName || "user"}</span>


            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  )
}
