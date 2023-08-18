import { createContext, useReducer } from "react";

//helper function that help me find inside the existing array any carditem that match the id of card item
//then if find then increment the quantity otherwise i make new cart item

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'

}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


const cartReducer = (state , action ) => {
    const { type, payload} = action
    
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}


export const CartProvider = ({children}) => {


    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0)

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS,
                  payload: {
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount
                  }    
                })

        
    }




    /**
    * For Adding, Remove and Clearing the Cart Item 
    */
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
       const newCartItems = removeCartItem(cartItems, cartItemToRemove)
       updateCartItemsReducer(newCartItems)
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool})
    }


    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemFromCart,
        cartTotal,
    }

    return ( 
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}