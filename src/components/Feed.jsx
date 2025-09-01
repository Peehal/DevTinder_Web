import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async() => {
//     if (feed) return;
//     try {const res = await axios.get(BASE_URL + "/feed", {
//       withCredentials:true,
//     });
//     dispatch(addFeed(res.data));}
//     catch(error){
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);


// ****************** MAIN ***********
  // if(!feed) return;

  // if(feed.length <= 0 ) return <h1>No New users Found</h1>


  // return feed &&(
  //   <div className="flex justify-center my-10">
  //     <UserCard user={feed.user[0]}  />
  //   </div>
  // )

// ******************************************
// **********************************

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return;
      try {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    getFeed();
  }, []);

  console.log("feed data:", feed);

  if (feed === null) {
    return <div>Loading...</div>;
  }

  if (!feed?.length && !(feed?.user?.length)) {
    return <div>No new user found</div>;
  }

  const user = Array.isArray(feed) ? feed[0] : feed?.user?.[0];

  if (!user) {
    return <div >No new user found</div>;
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={user} />
    </div>
  );
};

export default Feed;
