import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { ReactComponent as SiteLogo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.components";
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

// import './navigation.styles.jsx';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { cartOpened  } = useContext(CartContext);
    const signOutHandler = async () => {
       await signOutUser();
    };
    

    return (
    <Fragment>
        <NavigationContainer>
          <LogoContainer to="/">
            <SiteLogo className="logo"/>
          </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
              SHOP
            </NavLink>
            {                    
              currentUser ? 
                (<NavLink as='span' className="nav-link" onClick={signOutHandler}>
                  SIGN OUT
                </NavLink> ):
                (<NavLink to="/auth">
                  SIGN IN
                </NavLink>)
            }
            <NavLink to="/contact">
              CONTACT
            </NavLink>
            <CartIcon />
          </NavLinks>
          { cartOpened && <CartDropDown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;