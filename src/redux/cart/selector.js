import {useDispatch} from "react-redux";
import {cartActions} from "@/redux/cart/index";

const selectCartModule = (state) => state.cart;

export const selectProductAmount = (state, id) =>
  selectCartModule(state)[id] || 0;

export const selectTotalAmount = (state) =>
    selectCartModule(state)["total"] || 0

export const selectAddedFilms = (state) => selectCartModule(state)["added"] || [];

export const selectFilms = (state) => {
    const dispatch = useDispatch()
    if (!selectCartModule(state)["films"]) dispatch(cartActions.download);
    return selectCartModule(state)["films"];
}
