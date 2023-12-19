import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../../Context/ToastContext';
import { AuthContext } from './../../Context/AuthContext';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import style from '../Users/Users.module.css';
import noData from "../../../src/assets/images/no-data.png"
import NoData from '../../Shared/NoData/NoData';

export default function Users() {

  const { baseUrl, requestHeaders }: any = useContext(AuthContext);
  const { getToastValue }: any = useContext(ToastContext);
  const [userList, setUserList] = useState<any[]>([]);
  const [itemId, setItemId] = useState<number>(0);
  const [searchString, setSearchString] = useState('');
  const [modelState, setModelState] = useState("close")
  const [userDetails, setUserDetails] = useState({});

  const handleClose = () => setModelState("close");
  // Get All users
  const getAllUsers = (pageNo: number, name: string) => {

    axios.get(`${baseUrl}/Users/`, {
      headers: requestHeaders,
      params: {
        pageSize: 5,
        pageNumber: pageNo,
        userName: name,
      }
    })
      .then((response) => {
        setUserList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  //View Users API
  const getUsersDetails = (id) => {
    axios
      .get(`${baseUrl}/Users/${id}`, {
        headers: requestHeaders,
      })

      .then((response) => {
        setUserDetails(response.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }
  // toggle activated employee
  const activatedEmployee = (itemId: number, data: any) => {
    axios.put(`${baseUrl}/Users/${itemId}`, data, {
      headers: requestHeaders,
    })
      .then((response) => {
        console.log(response);

        getAllUsers();
        getToastValue("success", response?.data?.message || "Updated Sucessfully")
      })
      .catch((error) => {
        console.log(error);

        getToastValue("error", error?.response?.data?.message || "Error in updating the status");
      })
  }


  // Toggle activation status
  const toggleActivationStatus = (itemId: number, isActivated: boolean) => {
    const updatedData = { isActivated: !isActivated };
    activatedEmployee(itemId, updatedData);
  };

  //view Model
  const showViewModel = (id: number) => {
    setItemId(id);
    setModelState("view-model")
    getUsersDetails(id)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  // Search by name
  const getNameValue = (input) => {
    console.log(input);
    setSearchString(input.target.value);
    getAllUsers(1, input.target.value);
  }

  return (
    <>
      {/* View Model */}
      <Modal show={modelState === "view-model"} onHide={handleClose}>

        <Modal.Body>
          <h4 className=' text-whit bg-success text-center'> User Details </h4>
          <div className='text-center'>
            {userDetails?.imagePath ?
              <img
                className=' img-fluid'
                src={`http://upskilling-egypt.com:3003` + userDetails?.imagePath} alt="" /> :
              <img className='img-fluid' src={noData} />
            }
            <p><span className={`${style.title}`}>User Name:</span>{userDetails?.userName}</p>
            <p><span className={`${style.title}`}>Email:</span>{userDetails?.email}</p>
            <p><span className={`${style.title}`}>Phone:</span>{userDetails?.phoneNumber}</p>

            <button
              onClick={handleClose}
              className='btn w-50'>Close
            </button>
          </div>

        </Modal.Body>

      </Modal>
      {/* Header */}
      <div className='header d-flex justify-content-between p-3'>
        <h3>Users</h3>

      </div>

      {userList.length > 0 ?
        <div className='table-container1 vh-100'>
          <div className='w-50'>
            <div>
              <input onChange={getNameValue} placeholder='search by user name....' className='form-control my-2' type="text" />
            </div>
          </div>

          <table className="table">
            <thead className='table-head table-bg'>
              <tr>

                <th scope="col">user Name</th>
                <th scope="col">Statues</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Date Created</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (

                <tr key={user.id} >

                  <td >{user.userName}</td>
                  <td >
                    {user.isActivated ?
                      (
                        <div className={`${style.active} ${style.badgeActiveInActive}`}>Active</div>) : (
                        <div className={`${style.inactive} ${style.badgeActiveInActive}`}>InActive</div>
                      )}
                  </td>
                  <td >{user.phoneNumber}</td>
                  <td >{user.email}</td>
                  <td >{new Date(user.group.creationDate).toLocaleDateString()}</td>
                  <td>

                    <button className={`${style.blockBtn} mx-2`} onClick={() => toggleActivationStatus(user.id, user.isActivated)}>
                      {user.isActivated ? 'Block' : 'Unblock'}
                    </button>
                    <i onClick={() => showViewModel(user.id)}
                      className="fa-solid fa-eye text-success"></i>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
        :
        <NoData />

      }

    </>
  )
}

