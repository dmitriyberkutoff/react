const selectFilterModule = (state) => state.filter;

export const selectFilter = (state, id) => selectFilterModule(state)[id] || ''

