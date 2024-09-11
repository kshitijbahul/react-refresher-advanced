import { createSlice } from '@reduxjs/toolkit';

const INITIAl_STATE = {
    cartOpened: false,
    cartItems: [],
}
const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(
        (eachItem) => eachItem.id === productToAdd.id
    );
    if(existingItem){
        return cartItems.map(
            (eachItem) =>  eachItem.id === productToAdd.id ? {...eachItem, quantity : eachItem.quantity+1} : eachItem
            
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
    
}

const removeCartItem = (cartItems,removedProduct) => {
    return cartItems.filter(( cardItem )=> cardItem.id !== removedProduct.id);
}
const decreaseCartItem = (cartItems,removedProduct) =>  {
    const cartElement = cartItems.find((cartItem) => cartItem.id === removedProduct.id );
    if (cartElement.quantity === 1) {
        return removeCartItem(cartItems,removedProduct);
    } else {
        const newCartItems = cartItems.map((cartItem) => 
            cartItem.id === removedProduct.id ? {...cartItem,quantity: cartItem.quantity-1} : cartItem
        );
        return newCartItems;
    }
}

const categorySlice = createSlice({
    name: 'cart',
    initialState: INITIAl_STATE,
    reducers: {
        setCartItems: (state,action) => {
            console.log('in setCartItems the action is ', action);
            state.cartItems = action.payload;
        },
        toggleCartShown: (state,action) => {
            console.log('in toggleCartShown the action is >>>>', action);
            state.cartOpened = !action.payload;
        },
        addItemToCart: (state,action) => {
            state.cartItems = addCartItem(state.cartItems,action.payload);
        },
        removeItemsFromCart: (state,action) => {
            console.log('in addItemToCart the state is ', state);
            console.log('in addItemToCart the action is ', action);
            state.cartItems = removeCartItem(state.cartItems,action.payload);
        },
        decreaseItemsFromCart: (state, action) => {
            console.log('in addItemToCart the state is ', state);
            console.log('in addItemToCart the action is ', action);
            state.cartItems = decreaseCartItem(state.cartItems, action.payload);
        }
    }
 });

 export const {setCartItems, toggleCartShown, addItemToCart, removeItemsFromCart, decreaseItemsFromCart} = categorySlice.actions;
 export const cartReducer = categorySlice.reducer;
/* 
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
} */