import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'
import { signOutUser } from '../../utils/firebase.utils'
import './navigation.styles.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  const signOutHandler = async () => {
    await signOutUser()
  }
  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
