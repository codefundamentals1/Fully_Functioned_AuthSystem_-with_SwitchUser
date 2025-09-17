import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts/Authcontext'
import {routes} from '../routes/routes'
import {BrowserRouter,  Link,  Outlet,  Route , Routes} from 'react-router-dom'
import Todo from '../Todo/Todo'
const Dashboard = () => {
  const {user, logout   } = useContext(AuthContext)
  return (
    <div>
      <div className='flex  justify-between p-5'>
    <h1>Hii {user.username} this is your dashboard</h1>
    <button onClick={logout}> Logout </button>
    
</div>
    <div className='m-5 p-5 ' >
    <ul className="flex justify-center bg-blue-600 p-3 shadow-md rounded-lg gap-8 font-bold ">      
        <Link to= "tictactoe"><li>tictactoe</li></Link>
        <Link to= "form"><li>Form</li></Link>
        <Link to= "todo"><li>Todo</li></Link>
      </ul>
    </div>
    <Outlet/>
    </div>
  )
}

export default Dashboard