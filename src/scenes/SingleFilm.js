import React, { useEffect } from "react";
import { useParams } from "react-router";

import { observer } from "mobx-react";
import { useMst } from "../models/Root";
import { Link } from "react-router-dom";

const SingleFilm = () => {
  const { id } = useParams();
  const { film, recList } = useMst();
  useEffect(() => {
    film.loadFilm(id);
    recList.load(id);
  });
  return (
    <div>
      <div>
        <img
          alt="omg"
          src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
          width="200px"
        />
        <h3>{film.title}</h3>
        <h4>
          Release {film.release_date} Rating {film.vote_average}
        </h4>
        <p>{film.overview}</p>
        <h4>Recomendations:</h4>
        <ul>
          {recList.results.map(el => {
            return (
              <li key={el.id}>
                <Link to={"/movies/" + el.id}>{el.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      )
    </div>
  );
};

export default observer(SingleFilm);
