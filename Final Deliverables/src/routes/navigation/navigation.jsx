import { Fragment, useContext  } from "react";
import { Outlet } from "react-router-dom";

import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { UserContext } from "../../contexts/user.context";

import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.style";

const Navigation = ()=>{

    const {currentUser,signOutUser} = useContext(UserContext);
    const {cartVisibility} = useContext(CartDropdownContext);
    
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    {
                        currentUser && <span>{currentUser.NAME}</span>
                    }
                    {
                        currentUser && (<NavLink as="span" onClick={signOutUser}>Sign Out</NavLink>)
                    }
                    {   
                        !currentUser && (<NavLink className="nav-link" to="/auth/login">Login</NavLink>)
                    }    
                    {
                        !currentUser && (<NavLink className="nav-link" to="/auth/signup">Sign Up</NavLink>)    
                    }
                    <CartIcon />
                </NavLinks>
                {
                    cartVisibility && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;