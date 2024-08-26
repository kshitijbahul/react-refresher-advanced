import { createSelector } from "reselect";

const selectCart = (state) =>  state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartOpened = createSelector(
    [selectCart],
    (cart) => cart.cartOpened
)

export const selectCartValue = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0)
)

export const selectCartSize = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
)