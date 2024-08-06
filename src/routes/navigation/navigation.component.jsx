import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as SiteLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const signOutHandler = async () => {
      const response = await signOutUser();
      console.log('User Signed Out', response);
      setCurrentUser(null);
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
          </div>
        </div>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;