const selectCartModule = (state) => state.cart;

export const selectProductAmount = (state, id) =>
  selectCartModule(state)[id] || 0;

export const selectTotalAmount = (state) =>
    selectCartModule(state)["total"] || 0

export const selectAddedFilms = (state) => selectCartModule(state)["added"] || [];
