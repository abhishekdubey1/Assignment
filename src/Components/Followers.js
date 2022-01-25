import { useEffect, useState } from "react";
import { getReposApi, pages } from "../App";

const Followers = ({ username, setPage, setRepos, setUsername }) => {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/followers`)
      .then((data) => data.json())
      .then((followers) => setFollowers(followers))
      .catch((err) => console.log(err));
  }, [username]);
  const handleClick = async (username) => {
    try {
      setUsername(username);
      const response = await fetch(getReposApi(username));
      const data = await response.json();
      if (Array.isArray(data) && response.status === 200) {
        setRepos(data);
      } else if (String(response.status).startsWith("4")) {
        //throw Error
      }
    } catch (error) {
      console.log(error.message);
    }
    setPage(pages[0]);
  };
  return (
    <>
      <button onClick={() => setPage(pages[0])}>Back</button>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id} onClick={() => handleClick(follower.login)}>
            {follower.login}
          </li>
        ))}
      </ul>
      {followers.length === 0 && "User has no followers"}
    </>
  );
};

export default Followers;
