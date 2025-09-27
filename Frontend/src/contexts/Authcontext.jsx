import { createContext, useEffect, useState } from "react";
import validusers from "../static/validusers";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [error, setError] = useState("");
  const [signedUsers, setSU] = useState([]);
  const [currentId, setcid] = useState(localStorage.getItem("currentId"));
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  console.log("Auth rendering");
  const [isLoggedin, setisLoggedin] = useState(!!currentId);
  const [isloading, setisLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("signedUsers") ?? "[]";
    const su = JSON.parse(u);

    setSU(su);

    if (su && su.length != 0) {
      setuser(su[currentId]);
      setisLoggedin(true);
    } else setisLoggedin(false);
  }, []);

  async function login(username, password) {
    setisLoading(true);
    console.log("trying login", signedUsers);
    if (signedUsers && signedUsers.length != 0) {
      console.log("trying login in signe dusers");
      let id = 0;
      let checkUser = signedUsers.find((user, index) => {
        if (user.username === username && password === user.password) {
          id = index;
          setcid(id);
          return true;
        } else return false;
      });
      if (checkUser) {
        localStorage.setItem("currentId", id);
        setuser(signedUsers[id]);

        setisLoggedin(true);
        setisLoading(false);
        return true;
      }
    }
    let authToken = "";
    console.log("check valid users");

    const newuser = {
      username: username,
      password: password,
    };

    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((res) => {
        if (!res.ok) {
          setTimeout(() => {
            setError("user not found");
            console.log("usernot found");
            setisLoading(false);
            setisLoggedin(false);
            return false;
            // throw new Error("login failed");
          }, 1000);
          
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        authToken = data.token;
        console.log("auth tiken is ", authToken);

      
        if (authToken) {
          console.log("user found in valid users");
          const nSU = [
            ...signedUsers,
            { username: data.username, authToken: authToken },
          ];
          setSU(nSU);
          setuser({ username: data.username, authToken: authToken });
          localStorage.setItem("signedUsers", JSON.stringify(nSU));
          localStorage.setItem("currentId", nSU.length - 1);
          setcid(nSU.length - 1);
          setisLoggedin(true);
          setTimeout(() => {
            setisLoading(false);
          }, 500);
          return true;
        }
      })
      .catch((e) => {
        console.error("Error:", e)
      });
      
  }
  useEffect(() => {
    if (isLoggedin) console.log("user is ", user);
  }, [user]);

  function switchUsers(cid) {
    if (signedUsers && signedUsers.length != 0) {
      setisLoading(true);
      if (cid < signedUsers.length) {
        localStorage.setItem("currentId", cid);
        setcid(cid);
        setuser(signedUsers[cid]);
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  function logout() {
    console.log("logout triggered");
    const nSU = signedUsers.filter((user, index) => index !== currentId);
    console.log("su during logout", nSU);
    localStorage.setItem("signedUsers", JSON.stringify(nSU));
    setSU(nSU);
    setcid(0);
    localStorage.setItem("currentId", 0);

    if (nSU.length == 0) setisLoggedin(false);
    else setuser(nSU[0]);
  }

  const value = {
    user,
    isLoggedin,
    isloading,
    login,
    logout,
    signedUsers,
    switchUsers,
    currentId,
    
  };
  return (
    <AuthContext.Provider value={value} r>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;
