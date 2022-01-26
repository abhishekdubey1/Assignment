import produce from "immer";
import { useEffect, useReducer, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Followers from "./Components/Followers";
import RepoList from "./Components/RepoList";
import SingleRepo from "./Components/SingleRepo";
import "./styles.css";

export const getReposApi = (username = "") =>
  `https://api.github.com/users/${username}/repos`;

export const pages = ["main", "single-repo", "followers"];

const initialState = {
  username: "",
  repos: [],
  page: pages[0],
  repoIdx: 0,
  error: "",
  pageNum: 1
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USERNAME":
      return produce(state, (draft) => {
        draft.username = payload;
      });
    case "SET_REPOS":
      return produce(state, (draft) => {
        draft.repos = payload;
      });
    case "SET_PAGE":
      return produce(state, (draft) => {
        draft.page = payload;
      });
    case "SET_REPOIDX":
      return produce(state, (draft) => {
        draft.repoIdx = payload;
      });
    case "SET_ERROR":
      return produce(state, (draft) => {
        draft.error = payload;
      });
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export default function App() {
  const [
    { username, repos, page, repoIdx, error, pageNum },
    dispatch
  ] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(getReposApi(username));
      const data = await response.json();
      if (Array.isArray(data) && response.status === 200) {
        // setRepos(data);
        dispatch({ type: "SET_REPOS", payload: data });
      } else if (String(response.status).startsWith("4")) {
        //throw Error
        throw new Error("Some problem occured");
      }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "SET_ERROR", payload: error.message });
      //show error
    }
  };

  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => dispatch({ type: "RESET_state" })}
      >
        {page === pages[0] && (
          <>
            <form onSubmit={handleSubmit}>
              <input
                value={username}
                onChange={(e) =>
                  dispatch({ type: "SET_USERNAME", payload: e.target.value })
                }
              />
              <button type="submit">Submit</button>
            </form>
            <RepoList repos={repos} dispatch={dispatch} />
          </>
        )}
        {page === pages[1] && (
          <SingleRepo repo={repos[repoIdx]} dispatch={dispatch} />
        )}
        {page === pages[2] && (
          <Followers username={username} dispatch={dispatch} />
        )}
        {error !== "" && <ErrorFallback error={error} />}
      </ErrorBoundary>
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p className="error-msg">Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
