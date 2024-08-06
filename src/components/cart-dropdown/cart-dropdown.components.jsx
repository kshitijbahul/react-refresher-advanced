import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

const CartDropDown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>

            </div>
            <Button>Go to Checkout</Button>
        </div>
    );
}

export default CartDropDown;