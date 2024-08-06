import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as SiteLogo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.components";
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { cartOpened  } = useContext(CartContext);
    const signOutHandler = async () => {
      const response = await signOutUser();
      console.log('User Signed Out', response);
    };
    

    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <SiteLogo className="logo"/>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
              SHOP
            </Link>
            {
              currentUser ? 
                (<Link className="nav-link"  onClick={signOutHandler}>
                  SIGN OUT
                </Link> ):
                (<Link className="nav-link" to="/auth">
                  SIGN IN
                </Link>)
            }
            <Link className="nav-link" to="/contact">
              CONTACT
            </Link>
            <CartIcon />
          </div>
          { cartOpened && <CartDropDown/>}
        </div>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;