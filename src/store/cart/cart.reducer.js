import { createSlice } from "@reduxjs/toolkit"


const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    //check quantity is equal to 1, if it is remove that item form cart
    if(existingCartItem.quantity === 1) {
        //we only want to keep the cartItem if the statment return true
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    //return back cartItems with matching cartItem with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem)
}


const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}


export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}




export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {

        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload
        },
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload)
        },

        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload)
        },

        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload)
        },


    }
})



export const {setIsCartOpen , addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions

export const cartReducer  = cartSlice.reducer 