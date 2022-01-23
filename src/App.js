import { useState } from "react";
import Followers from "./Components/Followers";
import SingleRepo from "./Components/SingleRepo";
import "./styles.css";
const getReposApi = (username = "") =>
  `https://api.github.com/users/${username}/repos`;
const pages = ["main", "single-repo", "followers"];
export default function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(pages[0]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(getReposApi(username));
      const data = await response.json();
      if (Array.isArray(data) && response.status === 200) {
        setRepos(data);
      } else if (String(response.status).startsWith("4")) {
        //throw Error
      }
    } catch (error) {
      console.log(error.message);
      //show error
    }
  };
  return (
    <div className="App">
      {page === pages[0] && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {repos.map((repo) => (
              <li onClick={() => {}}>
                <img src={repo.owner.avatar_url} alt="avatar" />
                {repo.name}
              </li>
            ))}
          </ul>
        </>
      )}
      {page === pages[1] && <SingleRepo />}
      {page === pages[2] && <Followers />}
    </div>
  );
}
