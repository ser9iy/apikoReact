import { types, flow, applySnapshot, getSnapshot } from "mobx-state-tree";

const Recomendation = types.model({
  title: types.string,
  id: types.number
});

export const RecList = types
  .model({
    results: types.array(Recomendation)
  })
  .actions(self => ({
    load: flow(function* flow(id) {
      const res = yield fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=89c7d7d9e7a3de86e27a4d871fb88384&language=en-US&page=1`
      );
      let result = yield res.json();
      result.results = result.results.splice(0, 3);
      applySnapshot(self, result);
    })
  }));
export const Film = types
  .model({
    poster_path: types.maybeNull(types.optional(types.string, "")),
    overview: types.string,
    release_date: types.string,
    id: types.number,
    vote_average: types.number,
    title: types.string
   
  })
  .actions(self => ({
    loadFilm: flow(function* loadFilm(id) {
     
      const res = yield fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=89c7d7d9e7a3de86e27a4d871fb88384&language=en-US`
      );

      applySnapshot(self, yield res.json());
      
    }),
    addRec({ title, id }) {
      self.recommendations.push({
        title: title,
        id: id
      });
    }
  }));

export const FilmsList = types
  .model({
    page: types.optional(types.number, 1),
    total_pages: types.optional(types.number, 1),
    results: types.optional(types.array(Film), [])
  })
  .actions(self => {
    let initState = {};
    return {
      afterCreate() {
        self.load();
        // console.log("created");
        initState = getSnapshot(self);
      },
      findById(id) {
        const res = self.results.find(el => el.id === parseInt(id));
        return res;
      },
      clear() {
        applySnapshot(self, initState);
      },
      load: flow(function* load() {
        const resp = yield fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=89c7d7d9e7a3de86e27a4d871fb88384&page=" +
            self.page
        );

        applySnapshot(self, yield resp.json());
        
      }),
     
    };
  });
