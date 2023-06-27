import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    added: {},
    total: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state, {payload}) => {
            const count = state[payload] || 0;
            if (!state["added"][payload]) state["added"][payload] = true;
            if (count < 30) state["total"]++
            state[payload] = Math.min(count + 1, 30);
        },
        decrement: (state, {payload}) => {
            const count = state[payload];

            if (!count) {
                return;
            }

            if (count === 1) {
                delete state[payload];
                state["total"]--;
                delete state["added"][payload];
                return;
            }

            state["total"]--;

            state[payload] = count - 1;
        },
        reset: (state, {payload}) => {
            state["total"] -= state[payload];
            delete state[payload];
            delete state["added"][payload];
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
