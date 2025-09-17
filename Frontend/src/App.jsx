import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import AuthContext from "./contexts/Authcontext";
import Dashboard from "./components/Home/Dashboard";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./components/Todo/Todo";
import TicTacToe from "./components/TictacToe/TicTacToe";
import Form from "./components/Form/Form";
import { routes } from "./components/routes/routes";

function Homeredirect() {
  const { user, isLoggedin } = useContext(AuthContext);
  return isLoggedin ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoggedin } = useContext(AuthContext);

  console.log("is logged in", isLoggedin);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homeredirect />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* <Route path="todo" element={<Todo />} />
            <Route path="tictactoe" element={<TicTacToe />} />
            <Route path="form" element={<Form />} /> */}
            {/* //more effecient 00 */}
             {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
          

          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
