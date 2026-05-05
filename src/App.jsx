import Header from "./Components/Header/Header";
import Card from "./Components/Card";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userAuth from "../appwrite/authConfig";
import Footer from "./Components/Footer/Footer";
import { Home } from "./Components";
import { Outlet } from "react-router-dom";
import { login } from "./store/authSlice";
import { logout } from "./store/authSlice";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    userAuth
      .getCurrentUser()
      .then((userData) => {
        console.log("app pe user data :",userData)
        if (userData) {
          dispatch(
            login({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            }),
          );
        } else {
          dispatch(logout());
        }
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div>
      <Header />
      
        <Outlet />
      
      <Footer />
    </div>
  ) : (
    "loading...."
  );
}

export default App;
