import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

  const intitalStatus = localStorage.getItem('authToken') // this  will handle the asychronues operation 
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  console.log("Auth rendering");
  const [isLoggedin, setisLoggedin] = useState(!!intitalStatus); // it change the string to boolean
  const [isloading, setisLoading] = useState(false);
  const [token , setToken] = useState(null)
  
  useEffect(()=>{
    if(localStorage.getItem('authToken')) setisLoggedin(true);
    else setisLoggedin(false);
  },[])

  function login(username, password, authToken) {
    console.log("in auth", username, password);
    setisLoading(true);
    setuser({
      username: username,
      password: password,
    });
    setToken(authToken)
    localStorage.setItem('authToken', authToken)
    setTimeout(() => {
      setisLoggedin(true);
      setisLoading(false);
    }, 1000);
  }
  useEffect(() => {
    if (isLoggedin) console.log("user is ", user);
  }, [user]);

  
  function logout() {
   console.log("logging out...");
   setisLoading(true)
   setTimeout(()=>{

     localStorage.removeItem('authToken');
     setToken(null);
     setisLoggedin(false);
      setuser({
        username: "",
        password: "",
      });
      setisLoading(false)
   },1000)
    
  }
 


  const value = {
    user,
    isLoggedin,
    isloading,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value} r>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider };

export default AuthContext;
