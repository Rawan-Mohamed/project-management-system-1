
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import noData from "./../../assets/images/no-data.png";
// import Modal from "react-bootstrap/Modal";

import { AuthContext } from "./../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
// import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NoData from "../../Shared/NoData/NoData";


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

  // **********get all tasks**********pageSize:number, pageNumber:number*******
  const getTasksList =  async(pageSize:number, pageNumber:number) => {
    // setIsLoading(true);
    await axios
      .get(`${baseUrl}/Task/manager?pageSize=10&pageNumber=1`, 
      { headers: requestHeaders ,
        // params:{
        //   pageSize: 5,
        //   pageNumber: pageNumber,
        // }
      })
      .then((response) => {
        // setIsLoading(false);
        console.log(response.data);
        // setTasks(response?.data?.data);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error);
        // getToastValue(
        //   "error",
        //   error?.response?.data?.message ||
        //     "An error occurred. Please try again."
        // );
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
              <th scope="col">Status</th>
              <th scope="col">Description</th>
              
              <th scope="col">User</th>   
              <th scope="col">Date Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
            // tasks?.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task?.id}>
                  <th scope="row">{task?.title}</th>
                  <td>{task?.status}</td> 
                  <td>{task?.description}</td> 
                  
                  <td>User</td>
                  <td>{task?.description}</td>  
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
            // ) : (
            //   <NoData/>
            // )
            }
          </tbody>
        </table>

      </div>
    </>
    {/* table */}
  </>
  )
}

export default Tasks