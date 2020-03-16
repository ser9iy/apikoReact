import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import { useMst } from "../models/Root";

const FilmList = ({ query }) => {
  const { filmsList } = useMst();
  useEffect(() => {});
  return (
    <div>
      <ul>
        {filmsList.results.map(el => (
          <li key={el.id}>
            <Link to={"/movies/" + el.id}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(FilmList);
