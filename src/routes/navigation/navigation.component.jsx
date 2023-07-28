//Fragement don't display the wrap div in our real dom
import { Fragment } from "react"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
//Link is act as achor tag
import { Outlet, Link } from "react-router-dom"

import './navigation.styles.scss'


const Navigation = () => {
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
                <Link className="nav-link" to='/sign-in'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation