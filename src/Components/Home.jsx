import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/Userslice";
import {motion} from 'framer-motion'
import {
  createTask,
  fetchTasks,
  updateTask,
  deleteTask,
} from "../Features/TaskSlice";
import { toast } from "react-toastify";

const Home = () => {
  const logger = useSelector((state) => state.users.login);
  const user = useSelector((state) => state.users.user);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setupdate] = useState(false)

  const oscillator=()=>{
    setupdate(!update)
  }


  const [taskTitle, setTaskTitle] = useState("");

  const logouthandler = () => {
    dispatch(logout())
      .then((response) => {
        toast.success(response.payload.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Logout Error");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (logger) {
          dispatch(fetchTasks(user)).then((response) => {
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [update,user]);
  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim() !== "") {
      dispatch(createTask([{ title: taskTitle },user]))
        .then((response) => {
          toast.success(response.payload.message);
          oscillator()
          setTaskTitle('')
        })
        .catch((error) => {
          console.error(error);
          toast.error("Please try again later.");
        });
    } else {
      toast.error("Empty Task!");
    }
  };

  // Additional functions for update and delete tasks
  const updateTaskHandler = (task) => {
    dispatch(updateTask(task))
      .then((response) => {
        oscillator()
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating task.");
      });
  };

  const deleteTaskHandler = (task) => {
    dispatch(deleteTask(task))
      .then((response) => {
        oscillator()
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error deleting task.");
      });
  };

  return logger ? (
    <div className="flex min-h-[100vh] flex-col">
      <div className="flex h-[100px] items-center w-full justify-between px-6">
        <h1 className="text-[30px]">TinuDo</h1>
        <button
          onClick={logouthandler}
          className="bg-blue-400 text-white px-6 py-2 rounded-md font-semibold sm:text-[20px] text-[16px] my-4 transition duration-2 ease-in-out hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
      <h1 className="sm:text-[30px] text-[25px] w-full text-center font-semibold">Hello {user.name} !!👋</h1>

      <div className="w-full justify-center mt-20">
        <form onSubmit={addTask} className="flex mx-6 justify-center gap-4">
          <input
            onChange={handleInputChange}
            type="text"
            value={taskTitle}
            className="text-[#40403f] w-full sm:w-[500px] px-6 sm:text-[26px] text-[18px] outline-none rounded-md py-2"
            placeholder="Enter task "
          />
          <button
            type="submit"
            className="bg-green-400 w-[100px] text-white px-6 py-2 rounded-md font-semibold sm:text-[20px] text-[16px] transition duration-2 ease-in-out hover:bg-green-700"
          >
            Add
          </button>
        </form>
        <div className="my-6 w-full">
          {
          tasks.map((task) => (
            <motion.div
            initial={{opacity:0,x:100}}
            animate={{opacity:1,x:0}}
            transition={{duration:1,type:'spring'}}

            
            key={task._id} className="w-full flex items-center justify-center">
              <div   className="xs:w-[500px] w-[80%] justify-between bg-[#6c6c6c] sm:text-[20px]  text-[16px] xs:flex-row flex-col flex my-2 py-3 rounded-md px-6">
                <h1 className={`w-full ${task.completed?'line-through text-[#323131] ':''} text-center `}>{task.title}</h1>

                <div className="flex gap-2 justify-between">
                  <button
                    onClick={() =>
                      updateTaskHandler(task)
                    }
                    className="bg-yellow-400 text-[#131312] px-4 py-1 rounded-md  sm:text-[16px] text-[14px]  transition duration-2 ease-in-out hover:bg-yellow-700"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => deleteTaskHandler(task)}
                    className="bg-red-400 text-white px-4 py-1 rounded-md sm:text-[16px] text-[14px] transition duration-2 ease-in-out hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center flex-col text-center items-center h-[100vh] ">
      <h1 className="text-[40px]">User not authenticated, kindly Login</h1>

      <Link
        to={"/"}
        className="bg-blue-400 text-white px-6 py-2 rounded-md font-semibold text-[20px] my-4 transition duration-2 ease-in-out hover:bg-blue-700"
      >
        Login
      </Link>
    </div>
  );
};

export default Home;
