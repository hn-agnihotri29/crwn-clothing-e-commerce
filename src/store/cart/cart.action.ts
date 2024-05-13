import { CategoryItem } from "../categories/category.types";

import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction,withMatcher , ActionWithPayload } from "../../utils/reducer/reducer.utlis";



const addCartItem = (cartItems : CartItem[], productToAdd: CategoryItem) : CartItem[ ] => {
    //find if cartItems contain product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    //if found increment the quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem)
    }


    //return new arry with modified cartItems/new cart Items
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems : CartItem[], cartItemToRemove: CartItem) : CartItem[] => {
    //find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    //check quantity is equal to 1, if it is remove that item form cart
    if(existingCartItem && existingCartItem.quantity === 1) {
        //we only want to keep the cartItem if the statment return true
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    //return back cartItems with matching cartItem with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem)
}



const clearCartItem = (cartItems : CartItem[], cartItemToClear : CartItem) : CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN , boolean >;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

 
export const setIsCartOpen = withMatcher((boolean : boolean) : SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

/**
* For Adding, Remove and Clearing the Cart Item 
*/

export const setCartItems = withMatcher((cartItems : CartItem[]) : SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems : CartItem[], productToAdd : CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems : CartItem[], cartItemToRemove : CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems : CartItem[], cartItemToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};
