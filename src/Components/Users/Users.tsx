import React, { useContext } from 'react'
import { ToastContext } from '../../Context/ToastContext';
import { AuthContext } from './../../Context/AuthContext';
import axios from 'axios';
export default function Users() {
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  // const { getToastValue } = useContext(ToastContext);
  const [userList, setUserList] = React.useState();

  const getAllUsers = (pageNo:number, name:string) => {

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
        // setCurrentPage(pageNo);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  return (
    <div>Users</div>
  )
}

