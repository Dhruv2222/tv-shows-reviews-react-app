import { useLocation } from "react-router";
import Home from "./index";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setShows } from "./reducer";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");

  async function searchShows() {
    if (searchQuery === "") {
      return;
    }
    await client.search(searchQuery ?? "").then((response) => {
      dispatch(setShows(response));
    });
  }

  searchShows();

  return (
    <div>
      <Home />
    </div>
  );
}

export default Search;
