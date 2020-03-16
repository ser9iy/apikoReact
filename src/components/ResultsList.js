import React from "react";
import { Link } from "react-router-dom";
export const ResultsList = ({ items }) => {
  return (
    <div>
      <h4>Results:</h4>
      <ul>
        {items.results.map(el => (
          <li key={el.id}>
            <Link to={"/movies/" + el.id}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
