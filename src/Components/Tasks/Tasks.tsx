// nadia.mohamed.taha166@gmail.com
// @Password123!

//token
//eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInJvbGVzIjpbIk1hbmFnZXIiLCJjYW5BZGRVc2VyIiwiY2FuVXBkYXRlVXNlciIsImNhbkRlbGV0ZVVzZXIiLCJjYW5HZXRVc2VyQnlJZCIsImNhbkdldEN1cnJlbnRVc2VyIiwiY2FuR2V0QWxsVXNlcnMiLCJjYW5DaGFuZ2VQYXNzd29yZCJdLCJ1c2VyTmFtZSI6Im5hZGlhMSIsInVzZXJFbWFpbCI6Im5hZGlhLm1vaGFtZWQudGFoYTE2NkBnbWFpbC5jb20iLCJ1c2VyR3JvdXAiOiJNYW5hZ2VyIiwiaWF0IjoxNzAzMDY4MDcyLCJleHAiOjE3MDY2NjgwNzJ9.ECN8Ispoty_gt3zS4q6hPw0yxLUupaEYCas3hbJ_Y8IXapR39ZQi9WA5oyjIrX10IspPUiWa27ne995iQHexj46cyKvmTPE2PdsL7pIR-xt51z2Vt9pbl6UGfjo6Rgj8UAk0_9AFB7aLR8coS4uBDt3iJBvucr7uXXzA334memARCvDRe981NkoKZ5fddkHgEE3OWGFTOjXqxgd8C-mFaxaVtrxaUw_CaXfg4l067__MjDCnbQLO3p88fiYgeQ1OBeLzoJ9V6EuYYqGjTUNiUe_LS2AXqx4dvN6RiFNCYwQX1zqSiU814RziffSuat_ZdL9PJtPuYJukQ0ygb4A-Og

//user//samiya.bouridane@gmail.com
//@Password123!
//manager@gmail.com
//@Password123!
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import noData from "./../../assets/images/no-data.png";
// import Modal from "react-bootstrap/Modal";
import NoData from './../../Shared/noData/noData';
import { AuthContext } from "./../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



const Tasks: React.FC  = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl, requestHeaders }: any = useContext(AuthContext);
  const { getToastValue }: any = useContext(ToastContext);
  
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  // const [itemId, setItemId]: any = useState(0);


  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // **********get all tasks*****************
  const getTasksList = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/Task/manager`, 
      { headers: requestHeaders })
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        setTasks(response?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };
  // **********navigate to add task******************
  const navigateToNew = () => {
    navigate("/dashboard/add-task");
  };
  useEffect(() => {
    getTasksList();
  }, [])
  return (
    <>
    <div className="header d-flex justify-content-between p-3">
      <h3>Tasks</h3>
      <button
        onClick={navigateToNew}
        className="btn btn-warning rounded-5 px-4"
      >
        <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;Add New
        Task
      </button>
    </div>
    {/* table */}
    <>
      <div className="table-container1 vh-100">
        <table className="table">
          <thead className="table-head table-bg ">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">User</th>   
              <th scope="col">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task?.id}>
                  <td>{task?.title}</td>
                  <td>{task?.description}</td>
                  <td>Status</td>
                  <td>Status</td>
                  <td>
                    <i
                      // onClick={() => showViewModal(project?.id)}
                      className="fa fa-eye  text-info px-2"
                    ></i>
                    <i
                      // onClick={() => showUpdateModal(project)}
                      className="fa fa-pen  text-warning px-2"
                    ></i>
                    <i
                      // onClick={() => showDeleteModal(project.id)}
                      className="fa fa-trash  text-danger"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData/>
            )}
          </tbody>
        </table>

      </div>
    </>
    {/* table */}
  </>
  )
}

export default Tasks