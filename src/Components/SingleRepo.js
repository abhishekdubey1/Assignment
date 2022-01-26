import { pages } from "../App";

const SingleRepo = ({ repo, dispatch }) => {
  return (
    <div className="single-repo">
      <div className="">
        <button
          onClick={() => dispatch({ type: "SET_PAGE", payload: pages[0] })}
        >
          Back
        </button>
        <button
          onClick={() => dispatch({ type: "SET_PAGE", payload: pages[2] })}
        >
          Followers
        </button>
      </div>
      <h1>{repo.name}</h1>
      <p>{repo.description || "No Description"}</p>
    </div>
  );
};

export default SingleRepo;
