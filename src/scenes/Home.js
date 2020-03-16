import React, { useState } from "react";

import { ResultsList } from "../components/ResultsList";

export const Home = () => {
  const [items, setItems] = useState({});
  async function search(query) {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=89c7d7d9e7a3de86e27a4d871fb88384&language=en-US&query=${query}&page=1&include_adult=false`
    );
    let items = await resp.json();
    setItems(items);
  }
  const searchSubmit = e => {
    e.preventDefault();
    search(e.target.search.value);
    e.target.search.value = "";
  };
  return (
    <div>
      <h3>Welcome</h3>
      <h4>Search for film or check out some popular one's</h4>
      <form onSubmit={searchSubmit}>
        <input type="text" name="search" placeholder="Search for film" />
        <button type="submit">Go</button>
      </form>
      <hr />
      {items.results && <ResultsList items={items} />}
    </div>
  );
};
