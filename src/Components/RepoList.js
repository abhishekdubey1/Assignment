import { pages } from "../App";

const RepoList = ({ repos, dispatch, setToPage2, setRepoIdx }) => {
  return (
    <ul className="repo-list">
      {repos.map((repo, idx) => (
        <li
          key={repo.id}
          onClick={() => {
            dispatch({ type: "SET_REPOIDX", payload: idx });
            dispatch({ type: "SET_PAGE", payload: pages[1] });
          }}
          className="repo-list-item"
        >
          {console.log(repo.id)}
          <img
            src={repo.owner.avatar_url}
            alt="avatar"
            className="repo-item__avatar"
          />
          {repo.name}
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
