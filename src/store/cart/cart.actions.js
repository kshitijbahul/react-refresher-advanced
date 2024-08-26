import { CART_ACTION_TYPES } from './cart.types';

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

export const addItemToCart = (cartItems, productToAdd) => {
    console.log('in addItemToCart the cartItems are ', cartItems);
    console.log('in addItemToCart the productToAdd are ', productToAdd);
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: addCartItem(cartItems, productToAdd),
    }
}

export const removeItemsFromCart = (cartItems, removedProduct) => {
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: removeCartItem(cartItems, removedProduct),
    }
}

export const decreaseItemsFromCart = (cartItems, removedProduct) => {
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: decreaseCartItem(cartItems, removedProduct),
    }
}

