//Fragement don't display the wrap div in our real dom
import { Fragment, useContext } from "react"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"


//Link is act as achor tag
import { Outlet } from "react-router-dom"
import { CartContext } from "../../context/cart.context"

import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"

import { signOutUser } from "../../utils/firebase/firebase.utils"

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"


const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser)
    //console.log(currentUser)
    const  {isCartOpen} = useContext(CartContext)

    const signOutHandler = async () => {
        await signOutUser()
    }

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks> 
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? 
                    (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ) :
                    (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />} 
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation