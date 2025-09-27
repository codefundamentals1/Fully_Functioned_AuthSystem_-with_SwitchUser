import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/Authcontext";
import { routes } from "../routes/routes";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Todo from "../Todo/Todo";

const Dashboard = () => {
  const { user, logout, signedUsers, switchUsers, currentId , cid ,error, setError } =
    useContext(AuthContext);

    
  const navigate = useNavigate();
  function handleSelectChange(e) {
    if (e.target.value === "Login") {
      navigate("/login");
    } else {
      switchUsers(e.target.value);
      setCurrSelect(e.target.value);
    }
  }
  const [currSelect, setCurrSelect] = useState(currentId);
// console.log("In dashboard user is " , user);
  function getdata(){
      fetch("/api/dashboard", {
     
        method: "GET",
        headers: {token : user.authToken }
      })
      .then ((res)=>{
        if(res.ok){
          return res.json()
        }
      })
      .then((res)=>{
        console.log("data from backend", res);
        // setdata(res);
      })
      .catch((e)=>console.log(e));
  }
  useEffect(()=>{
getdata();
  },[])

  return (
    <div>
      <div className="flex  justify-between p-5">
        <div className="flex justify-center">
        <h1>Hii {user.username} this is your dashboard</h1>
        </div>
        <div>
          <select
            onChange={handleSelectChange}
            value={currSelect}
            className="bg-black-700 border border-blue-700 text-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {signedUsers?.map((user, key) => (
              <option key={key} value={key} className="text-gray-700">
                {user.username}
              </option>
            ))}
            <option value="Login" className="text-gray-700">
              Login as other user
            </option>
          </select>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              logout();
            }}
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
      <div className="m-5 p-5 ">
        <ul className="flex justify-center bg-blue-600 p-3 shadow-md rounded-lg gap-8 font-bold ">
          <Link to="tictactoe">
            <li>tictactoe</li>
          </Link>
          <Link to="form">
            <li>Form</li>
          </Link>
          <Link to="todo">
            <li>Todo</li>
          </Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
