import { useEffect, useState } from "react";
import { getReposApi, pages } from "../App";

const Followers = ({ username, dispatch }) => {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/followers`)
      .then((data) => data.json())
      .then((followers) => setFollowers(followers))
      .catch((err) => console.log(err));
  }, [username]);

  const handleClick = async (username) => {
    try {
      dispatch({ type: "SET_USERNAME", payload: username });
      const response = await fetch(getReposApi(username));
      const data = await response.json();
      if (Array.isArray(data) && response.status === 200) {
        dispatch({ type: "SET_REPOS", payload: data });
      } else if (String(response.status).startsWith("4")) {
        //throw Error
      }
    } catch (error) {
      console.log(error.message);
    }
    dispatch({ type: "SET_PAGE", payload: pages[0] });
  };

  return (
    <>
      <button onClick={() => dispatch({ type: "SET_PAGE", payload: pages[0] })}>
        Back
      </button>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id} onClick={() => handleClick(follower.login)}>
            {follower.login}
          </li>
        ))}
      </ul>
      {followers.length === 0 && "User has 0 followers"}
    </>
  );
};

export default Followers;
