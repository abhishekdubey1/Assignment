import { pages } from "../App";

const SingleRepo = ({ repo, setPage }) => {
  return (
    <div>
      <button onClick={() => setPage(pages[0])}>Back</button>
      <h1>{repo.name}</h1>
      <p>{repo.description || "No Description"}</p>
      <button onClick={() => setPage(pages[2])}>Followers</button>
    </div>
  );
};

export default SingleRepo;
