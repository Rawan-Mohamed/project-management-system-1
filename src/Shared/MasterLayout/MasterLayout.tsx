import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../Navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({userData}) {
  return (
    <>

    {/* <div className="container-fluid">
        <div className=" d-flex">
            <div className=" ">
                <div>
                    <SideBar/>
                </div>
            </div>
            <div className="w-100 z-2">
                <div className='bg-info'>
                    <NavBar userData={userData}/>
                </div>
                <div className="content-container">
                <Outlet/>
                </div>
            </div>
        </div>
    </div> */}
    <div className="container-fluid">
  <div className="row">
    {/* Navbar at the top */}
    <div className="col-12">
      <div className="">
        <NavBar userData={userData} />
      </div>
    </div>
  </div>

  <div className="row">
    {/* Sidebar on the left */}
    <div className="col-md-3">
      <div>
        <SideBar />
      </div>
    </div>

    {/* Main content area */}
    <div className="col-md-9">
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  </div>
</div>
    </>
  )
}
