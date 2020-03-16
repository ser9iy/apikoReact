import { useContext, createContext } from "react";
import { types, onSnapshot } from "mobx-state-tree";

import { FilmsList, Film, RecList } from "./Film";

const RootModel = types.model({
  filmsList: FilmsList,
  film: Film,
  recList: RecList
});

export const rootStore = RootModel.create({
  filmsList: {},
  film: {
    poster_path: "",
    overview: "",
    release_date: "",
    id: 0,
    vote_average: 0,
    title: ""
  },
  recList: {}
});

//onSnapshot(rootStore, snapshot => console.log("Snapshot: ", snapshot));

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store error");
  }
  return store;
}
