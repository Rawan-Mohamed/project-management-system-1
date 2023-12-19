import React, { useContext } from 'react'
import logo from "../../assets/images/navLogo.png"
import avatar from "../../assets/images/avatar.png"
import { AuthContext } from '../../Context/AuthContext'
export default function NavBar() {
  const { userData }: any = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg nav-bg bg-light p-0 ">
      <div className="container-fluid ">
        <img src={logo} alt="" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex">

              {/* Bell Icon with Badge */}

              <div className='m-4'> <i className="fas fa-bell position-relative">
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  3
                </span>
              </i>
            </div>

              <img src={avatar} className='m-3 rounded-circle' alt='user-image' />
              {/* {userData?.userName || "user"} */}
              <a className="nav-link">{userData?.userName || "user"}
                <p>{userData.userEmail}</p>
              </a>


            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}
