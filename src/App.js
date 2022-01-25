import { useState } from "react";
import Followers from "./Components/Followers";
import RepoList from "./Components/RepoList";
import SingleRepo from "./Components/SingleRepo";
import "./styles.css";
export const getReposApi = (username = "") =>
  `https://api.github.com/users/${username}/repos`;
export const pages = ["main", "single-repo", "followers"];
export default function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(pages[0]);
  const [repoIdx, setRepoIdx] = useState(null);
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
          <RepoList
            repos={repos}
            setToPage2={() => setPage(pages[1])}
            setRepoIdx={setRepoIdx}
          />
        </>
      )}
      {page === pages[1] && (
        <SingleRepo repo={repos[repoIdx]} setPage={setPage} />
      )}
      {page === pages[2] && (
        <Followers
          username={username}
          setPage={setPage}
          setRepos={setRepos}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}
