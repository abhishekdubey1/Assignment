const RepoList = ({ repos, setToPage2, setRepoIdx }) => {
  return (
    <ul className="repo-list">
      {repos.map((repo, idx) => (
        <li
          onClick={() => {
            setRepoIdx(idx);
            setToPage2();
          }}
          className="repo-list-item"
        >
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
