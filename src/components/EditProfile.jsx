import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    // Clearing the errors

    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);



    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 min-h-screen pb-20">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <div className="form-control w-full max-w-xs my-4">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter your First Name"
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
                    placeholder="Enter your Last Name"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-control w-full max-w-xs my-4">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="text"
                    value={age}
                    placeholder="Enter your Age"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-control w-full max-w-xs my-4">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <input
                    type="text"
                    value={gender}
                    placeholder="Enter your Gender"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>

                <div className="form-control w-full max-w-xs my-4">
                  <label className="label">
                    <span className="label-text">About</span>
                  </label>
                  <input
                    type="text"
                    value={about}
                    placeholder="Enter your About"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                <div className="form-control w-full max-w-xs my-4">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    value={photoUrl}
                    placeholder="Enter your Photo URL"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-red-500 text-sm mb-2 text-left">{error}</p>
                <div className="card-actions justify-center"></div>
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      { showToast && <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
    <div className="alert alert-success shadow-lg">
          <span>Profile Saved Successfully</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
