import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

  const [emailID, setEmailId] = useState("alia@example.com");
  const [password, setPassword] = useState("Alia@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();


   const handleLogin = async () =>{

      try {
        const res = await axios.post( BASE_URL + "/login", {
          emailID,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/" );
      } catch (error) {
        console.error(error);
      }
   };


  return (
    <div className="flex justify-center my-40">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div >
            <div className="form-control w-full max-w-xs my-4">
              <label className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input
                type="text"
                value ={emailID}
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs my-8">
              <label className="label">
                <span className="label-text">Password </span>
              </label>
              <input
                type="text"
                value ={password}
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
