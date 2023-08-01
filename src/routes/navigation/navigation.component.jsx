//Fragement don't display the wrap div in our real dom
import { Fragment, useContext } from "react"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"


//Link is act as achor tag
import { Outlet, Link } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import { CartContext } from "../../context/cart.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"

import './navigation.styles.scss'


const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    //console.log(currentUser)
    const  {isCartOpen} = useContext(CartContext)

    const signOutHandler = async () => {
        await signOutUser()
    }

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container"> 
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? 
                    (
                        <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                    ) :
                    (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                    )
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />} 
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation