import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isloginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Somehting went wrong");
    }
  };

  const handleSignUp  = async () => {
    try {
      
      const res = await axios.post(BASE_URL +"/signup", {
        firstName, lastName, emailID, password
      },{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      return navigate("/profile");

    } catch (error) {
      setError(error?.response?.data || "Somehting went wrong");
    }
  }

  return (
    <div className="flex justify-center my-40">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center"> {isloginForm ? "Login" : "Signup"} </h2>
          <div>


            { !isloginForm && <><div className="form-control w-full max-w-xs my-4">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your firtName"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-control w-full max-w-xs my-4">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your lastName"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            </>
            }

            <div className="form-control w-full max-w-xs my-4">
              <label className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input
                type="text"
                value={emailID}
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>





            <div className="form-control w-full max-w-xs mb-2">
              <label className="label">
                <span className="label-text">Password </span>
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-red-500 text-sm mb-2 text-left">{error}</p>
            <div className="card-actions justify-center"></div>
            <button className="btn btn-primary" onClick={isloginForm ? handleLogin : handleSignUp}>
              {isloginForm ? "Login" : "Signup"}
            </button>
          </div>


            <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm ((value) => !value)}>
              {isloginForm ? "New User ? signUp here " : "Existing User ? Login here" }</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
