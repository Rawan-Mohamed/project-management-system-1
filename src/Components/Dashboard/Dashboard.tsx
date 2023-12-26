import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../Context/ToastContext";
import { AuthContext } from "../../Context/AuthContext";
import DonutChart from "react-donut-chart";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, baseUrl, requestHeaders }: any = useContext(AuthContext);
  const { getToastValue }: any = useContext(ToastContext);
  const [todoCount, setTodoCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [inActiveUserCount, setInActiveUserCount] = useState(0);

  const getTasksCount = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/Task/count`, { headers: requestHeaders })
      .then((response) => {
        setIsLoading(false);
        // console.log(response?.data);
        setTodoCount(response?.data?.toDo);
        setProgressCount(response?.data?.inProgress);
        setDoneCount(response?.data?.done);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
      });
  };
  const getUsersCount = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/Users/count`, { headers: requestHeaders })
      .then((response) => {
        setIsLoading(false);
        // console.log(response.data);
        setActiveUserCount(response?.data?.activatedEmployeeCount);
        setInActiveUserCount(response?.data?.deactivatedEmployeeCount);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
      });
  };

  useEffect(() => {
    getTasksCount();
    getUsersCount();
  }, []);

  return (
    <>
      <div className="bg-header m-5">
        <div className="bg-overlay">
          <div className="p-5 text-white">
            <h3 className="">
              Welcome <span className="title">{/* {userData.userName} */}</span>
            </h3>
            <p className="w-75 ">
              You can add project and assign tasks to your team
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="titles">
              <h3>Tasks</h3>
              <p>List of all tasks</p>
            </div>
            <div className="row tasks-count mt-5">
              <div className="col-md-4 ">
                <div className="tasks-status d-flex flex-column text-center p-3  rounded-4">
                  <i className="fa fa-tasks my-3"> </i>
                  <span className="py-3">To do</span>
                  <h3>{todoCount}</h3>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="tasks-status d-flex flex-column text-center p-3 rounded-4">
                  <i className="fa-solid fa-hourglass-end my-3"></i>
                  <span className="py-3">In-progress</span>
                  <h3>{progressCount}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tasks-status d-flex flex-column text-center  p-3  rounded-4">
                  <i className="fa-solid fa-clipboard-check my-3"></i>
                  <span className="py-3">Done</span>
                  <h3>{doneCount}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="titles">
              <h3>Users</h3>
              <p>List of all users</p>
            </div>
            <div className="row users-count mt-5">
              <div className="col-md-6">
                <div className="  status d-flex flex-column text-center rounded-4 p-3">
                  <i className="fa-brands fa-creative-commons-by my-3"></i>
                  <span className="py-3">Active users</span>
                  <h3>{activeUserCount}</h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className=" status d-flex flex-column text-center rounded-4 p-3">
                  <i className="fa-brands fa-creative-commons-pd my-3"></i>
                  <span className="py-3">De-active users</span>
                  <h3>{inActiveUserCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row chart my-5 ">
          <div className="col-md-6 ">
            <div className="tasks-chart rounded-5 d-flex align-items-center justify-content-center pt-5">
              <DonutChart
              data={[
                { label: 'To Do', value: todoCount },
                { label: 'In Progress', value: progressCount},
                { label: 'Done', value: doneCount},
              ]}
            
                // height={450}
                // width={450}
                colors={['#CFD1EC', '#E4E4BC', '#E7C3D7']}
              /> 
            </div>
          </div>
          <div className="col-md-6">
            <div className="tasks-chart rounded-5 d-flex align-items-center justify-content-center pt-5"><DonutChart
              data={[
                { label: 'Active Users', value: activeUserCount },
                { label: 'inactive Users', value: inActiveUserCount},
              ]}
            
                // height={450}
                // width={450}
                colors={['#55ce63', '#EA5446']}
               
              /> </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
