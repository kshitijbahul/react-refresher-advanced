import {CART_ACTION_TYPES} from './cart.types';

export const setCartItems = (cartItems) => {
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: cartItems,
    }
}

export const toggleCartShown = (cartOpened) => {
    return {
        type: CART_ACTION_TYPES.TOGGLE_CART_SHOWN,
        payload: !cartOpened,
    }
}

export const addCartItem = (productToAdd) => {
    return {
        type: CART_ACTION_TYPES.ADD_CART_ITEM,
        payload: productToAdd,
    }
}

export const removeCartItem = (removedProduct) => {
    return {
        type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
        payload: removedProduct,
    }
}

export const decreaseCartItem = (removedProduct) => {
    return {
        type: CART_ACTION_TYPES.DECREASE_CART_ITEM,
        payload: removedProduct,
    }
}