import { createContext, useState, useEffect } from "react";

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
    total: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=> {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
        setCartTotal(newCartTotal)
    }, [cartItems])


    /**
    * For Adding, Remove and Clearing the Cart Item 
    */
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
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