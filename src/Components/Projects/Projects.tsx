// nadia.mohamed.taha166@gmail.com
// @Password123!
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NoData from "./../../Shared/NoData/NoData";
import noData from "./../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../Context/AuthContext";
import { Link } from "react-router-dom";
import { ToastContext } from "../../Context/ToastContext";
import { useForm } from "react-hook-form";

const Projects: React.FC = () => {
  const { baseUrl, requestHeaders }: any = useContext(AuthContext);
  const { getToastValue }: any = useContext(ToastContext);
  const [project, setProject] = useState({});
  const [projectDetails, setProjectDetails] = useState({});
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  let [itemId, setItemId]: any = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  interface FormValues {
    title: string;
    description: string;
  }
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  // **********to use more than one modal in same component**********
  const [modalState, setModalState] = useState("close");
  // ********to close modal*******************
  const handleClose = () => setModalState("close");
  // ********to show view modal*******************
  const showViewModal = (id: any) => {
    setItemId(id);
    setModalState("view-modal");
    getPtojectDetails(id);
  };
  // ***********update modal******************
  const showUpdateModal = (project: any) => {
    setItemId(project.id);
    setValue("title", project.title);
    setValue("description", project.description);
    setModalState("update-modal");
  };
  // ********to show delete modal*******************

  const showDeleteModal = (itemId: any) => {
    setItemId(itemId);
    setModalState("delete-modal");
  };
  // **********get all projects*****************
  const getAllProjectsList = () => {
    axios
      .get(`${baseUrl}/Project/manager`, { headers: requestHeaders })
      .then((response) => {
        setProjects(response?.data);
      })
      .catch((error) => {
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };

  //****************update project**********************
  const updateProject = (data: any) => {
    setIsLoading(true);
    axios
      .put(`${baseUrl}/Project/${itemId}`, data, {
        headers: requestHeaders,
      })
      .then((response) => {
        handleClose();

        getAllProjectsList();
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
  const deleteProject = () => {
    setIsLoading(true);
    axios
      .delete(`${baseUrl}/Project/${itemId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setProjects(response.data.data);
        setItemId(itemId);
        handleClose();
        getToastValue(
          "success",
          response?.data?.message || "project deleted successfully"
        );

        getAllProjectsList();
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
  const getPtojectDetails = (itemId) => {
    axios
      .get(`${baseUrl}/Project/${itemId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setProjectDetails(response?.data);
      })
      .catch((error) => {
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };

  useEffect(() => {
    getAllProjectsList();
  }, []);
  return (
    <>
      <div className="header d-flex justify-content-between p-3">
        <h3>projects</h3>

        <button className="btn btn-warning rounded-5 px-4 ">
          <Link to={"/dashboard/add-project"} className="customize-link">
            <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;Add New
            Project
          </Link>
        </button>
      </div>
      {/* table */}
      <>
        <div className="table-responsive table-container1 vh-100">
          <table className="table">
            <thead className="table-head table-bg ">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Num Task</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.length > 0 ? (
                projects.map((project: any) => (
                  <tr key={project?.id}>
                    <td>{project?.title}</td>
                    <td>{project?.description}</td>
                    <td>{project?.task?.length}</td>
                    <td>
                      <i
                        onClick={() => showViewModal(project?.id)}
                        className="fa fa-eye  text-info px-2"
                      ></i>
                      <i
                        onClick={() => showUpdateModal(project)}
                        className="fa fa-pen  text-warning px-2"
                      ></i>
                      <i
                        onClick={() => showDeleteModal(project.id)}
                        className="fa fa-trash  text-danger"
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="4">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>

          
          </table>
          {/* ******************** view modal ***************************/}
          <Modal show={modalState == "view-modal"} onHide={handleClose}>
            <Modal.Header closeButton>
              <h3>Project Details</h3>
            </Modal.Header>
            <Modal.Body>
              <>
                <p>
                  <span className="text-warning">Title :&nbsp;</span>
                  {projectDetails?.title}
                </p>
                <p>
                  <span className="text-warning">description :&nbsp;</span>
                  {projectDetails?.description}
                </p>
                <p>
                  <span className="text-warning">creation Date :&nbsp;</span>
                  {projectDetails?.creationDate}
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
                onSubmit={handleSubmit(updateProject)}
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
                    <span className="text-danger ">title is required</span>
                  )}
                </div>

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
                  onClick={deleteProject}
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
  );
};
export default Projects;
