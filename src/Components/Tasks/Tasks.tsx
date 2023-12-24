
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import noData from "./../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "./../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import NoData from "../../Shared/NoData/NoData";
// import AddTask from "../AddTask/AddTask";
import noData from "./../../assets/images/no-data.png";
// import Select from 'react-select';


const Tasks: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl, requestHeaders }: any = useContext(AuthContext);
  const { getToastValue }: any = useContext(ToastContext);
  const [userList, setUserList] = useState([])
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({});

  // const [selectedUser, setSelectedUser] = useState(null);


  const [itemId, setItemId]: any = useState(0);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [modalState, setModalState] = useState("close");
  // ********to close modal*******************
  const handleClose = () => setModalState("close");
  // ********to show view modal*******************
  const showViewModal = (id: any) => {
    setItemId(id);
    setModalState("view-modal");
    getTaskDetails(id);
  };
  // ***********update modal******************
  const showUpdateModal = (task: any) => {
    setItemId(task.id);
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("employeeId", task.employee.userName);
    //  setValue("employeeId", task.employeeId.userName);
    setModalState("update-modal");
  };
  // ********to show delete modal*******************

  const showDeleteModal = (itemId: any) => {
    setItemId(itemId);
    setModalState("delete-modal");
  };


  // **********get all tasks**********pageSize:number, pageNumber:number*******
  const getTasksList = async (pageSize: number, pageNumber: number) => {
    // setIsLoading(true);
    await axios
      .get(`${baseUrl}/Task/manager`,
        {
          headers: requestHeaders,
          // params:{
          //   pageSize: 5,
          //   pageNumber: pageNumber,
          // }
        })
      .then((response) => {
        // setIsLoading(false);
        // console.log(response.data);
        setTasks(response?.data?.data);
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
  // Get All users
  const getAllUsers = () => {

    axios.get(`${baseUrl}/Users/`, {
      headers: requestHeaders,
      params: {
        pageSize: 40,
      }
    })
      .then((response) => {
        setUserList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //****************update project**********************
  const updateTask = (data: any) => {
    setIsLoading(true);
    axios
      .put(`${baseUrl}/Task/${itemId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        handleClose();

        getTasksList();
        getToastValue(
          "success",
          response?.data?.message || "Project updated suceessfully"
        );
      })
      .catch((error) => {
        getToastValue(
          "error",
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        );
      })
      .finally(() => setIsLoading(false));
  };
  // ************to deleted from projects*********
  const deleteTask = () => {
    setIsLoading(true);
    axios
      .delete(`${baseUrl}/Task/${itemId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setTasks(response.data.data);
        setItemId(itemId);
        handleClose();
        getToastValue(
          "success",
          response?.data?.message || "project deleted successfully"
        );

        getTasksList();
      })
      .catch((error) => {
        getToastValue(
          "error",
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        ).finally(() => setIsLoading(false));
      });
  };
  // ************get project details to view****************
  const getTaskDetails = (itemId) => {
    axios
      .get(`${baseUrl}/Task/${itemId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setTaskDetails(response?.data);
      })
      .catch((error) => {
        getToastValue(
          "error",
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        );
      });
  };

  // **********navigate to add task******************

  useEffect(() => {
    getTasksList();
    getAllUsers();
  }, [])


  // *********Search in dropdown **************
  // const handleUserChange = (selectedOption) => {
  //   setSelectedUser(selectedOption);
  //   getAllUsers(selectedOption?.label);
  // };
  // const filterOptions = (options, { inputValue }) => {
  //   return options.filter((user) =>
  //     user.label.toLowerCase().includes(inputValue.toLowerCase())
  //   ).slice(0, 5); // Limit the results to 5 items
  // };
  // const userOptions = userList.map((user) => ({
  //   value: user.id,
  //   label: user.userName,
  // }));
  return (
    <>
      <div className="header d-flex justify-content-between p-3">
        <h3>Tasks</h3>
        <Link
          to='/dashboard/tasks/add-task'
          className="btn btn-warning rounded-5 px-4"
        >
          <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;Add New
          Task
        </Link>

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
                <th scope="col">Project</th>
                <th scope="col">Date Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks?.length > 0 ? (
                  tasks.map((task: any) => (
                    <tr key={task?.id}>
                      <th scope="row">{task?.title}</th>
                      <td>{task?.status}</td>
                      <td>{task?.description}</td>
                      <td>{task.employee.userName}</td>
                      <td>{task.project.title}</td>
                      <td>{new Date(task.creationDate).toLocaleDateString()}</td>
                      <td>
                        <i
                          onClick={() => showViewModal(task?.id)}
                          className="fa fa-eye  text-info px-2"
                        ></i>
                        <i
                          onClick={() => showUpdateModal(task)}
                          className="fa fa-pen  text-warning px-2"
                        ></i>
                        <i
                          onClick={() => showDeleteModal(task.id)}
                          className="fa fa-trash  text-danger"
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoData />
                )
              }
            </tbody>
          </table>

          {/* ******************** view modal ***************************/}
          <Modal show={modalState == "view-modal"} onHide={handleClose}>
            <Modal.Header closeButton>
              <h3>Tasks Details</h3>
            </Modal.Header>
            <Modal.Body>
              <>
                <p>
                  <span className="text-warning">Title :&nbsp;</span>
                  {taskDetails?.title}
                </p>
                <p>
                  <span className="text-warning">description :&nbsp;</span>
                  {taskDetails?.description}
                </p>
                <p>
                  <span className="text-warning">status :&nbsp;</span>
                  {taskDetails?.status}
                </p>
                <p>
                  <span className="text-warning">Project :&nbsp;</span>
                  {taskDetails?.project?.title}
                </p>
              </>
            </Modal.Body>
          </Modal>
          {/* //*****************view modal******************** */}
          {/* ****************update modal *****************/}
          <Modal show={modalState == "update-modal"} onHide={handleClose}>
            <Modal.Header closeButton>
              <h3>Update project</h3>
            </Modal.Header>
            <Modal.Body>
              <p>Welcome Back! Please enter your details</p>
              <form
                onSubmit={handleSubmit(updateTask)}
                action=""
                className="form-wrapper m-auto   pt-5 pb-3 px-5"
              >
                <div className="form-group my-3">
                  <label className="label-title mb-2">Title</label>
                  <input
                    {...register("title", {
                      required: true,
                    })}
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter Title..."
                  />

                  {errors.title && errors.title.type === "required" && (
                    <span className="text-danger ">title is required</span>
                  )}
                </div>
                <div className="form-group my-3">
                  <label className="label-title mb-2">Description</label>
                  <textarea
                    {...register("description", {
                      required: true,
                    })}
                    rows={5}
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter description..."
                  ></textarea>

                  {errors.title && errors.title.type === "required" && (
                    <span className="text-danger ">desciption is required</span>
                  )}
                </div>
                <div className="form-group my-3">
                  <select
                    {...register("employeeId", { required: true, valueAsNumber: true })}
                    aria-label="Default select example"

                    className="form-select"
                  >
                    <option className="text-muted">
                      User
                    </option>
                    {userList.map((user) => (
                      <option key={user.id} value={user.id} >
                        <td>{user.userName}</td>

                      </option>

                    ))}

                  </select>
                  {errors.employeeId && errors.employeeId.type === "required" && (
                    <span className="text-danger ">No User Selected</span>
                  )}
                </div>
                {/* <div className="form-group my-3">
                  <Select
                    {...register("employeeId", { required: true, valueAsNumber: true })}
                    options={userOptions}
                    value={selectedUser}
                    onChange={handleUserChange}
                    placeholder="Search user..."

                  />
                  {errors.employeeId && errors.employeeId.type === "required" && (
                    <span className="text-danger ">No User Selected</span>
                  )}
                </div> */}
                <div className="form-group my-3 text-end">
                  <button
                    className={"btn my-3 px-4" + (isLoading ? " disabled" : "")}
                  >
                    {isLoading == true ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          {/***************** //update modal *****************/}
          {/* **************** * delete modal *****************/}
          <Modal show={modalState == "delete-modal"} onHide={handleClose}>
            <Modal.Header closeButton>
              <h3>delete this Project?</h3>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <img src={noData} />
                <p>
                  are you sure you want to delete this item ? if you are sure
                  just click on delete it
                </p>
              </div>
              <div className="text-end">
                <button
                  onClick={deleteTask}
                  className={
                    "btn btn-outline-danger my-3" +
                    (isLoading ? " disabled" : "")
                  }
                >
                  {isLoading == true ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Delete this item"
                  )}
                </button>
              </div>
            </Modal.Body>
          </Modal>
          {/************************* * //delete modal*************** */}

        </div>
      </>
      {/* table */}
    </>
  )
}

export default Tasks