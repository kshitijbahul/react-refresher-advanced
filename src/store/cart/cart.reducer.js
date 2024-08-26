import { set } from 'firebase/database';
import { CART_ACTION_TYPES } from './cart.types';

const INITIAl_STATE = {
    cartOpened: false,
    cartItems: [],
}

 

export const cartReducer = (state = INITIAl_STATE, action = {}) => {
    const {type, payload} = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            }
        case CART_ACTION_TYPES.TOGGLE_CART_SHOWN:
            return {
                ...state,
                cartOpened: payload,
            }
        case CART_ACTION_TYPES.ADD_CART_ITEM:
            return {
                ...state,
                cartItems: addCartItem(state.cartItems, payload),
            }
        case CART_ACTION_TYPES.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: removeCartItem(state.cartItems, payload),
            }
        case CART_ACTION_TYPES.DECREASE_CART_ITEM:
            return {
                ...state,
                cartItems: decreaseCartItem(state.cartItems, payload),
            }
        default:
            return state;
    }
}