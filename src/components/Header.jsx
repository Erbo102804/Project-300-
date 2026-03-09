import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import AuthModal from './AuthModal';

function Header({ activePage, onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.cart.orders);
  const testDrives = useSelector((state) => state.testDrive.bookings);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <span className="logo-icon">🚗</span>
          <h1>АвтоСалон <span>Premium</span></h1>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-btn ${activePage === 'catalog' ? 'active' : ''}`}
            onClick={() => onNavigate('catalog')}
          >
            Каталог
          </button>
          <button
            className={`nav-btn ${activePage === 'cart' ? 'active' : ''}`}
            onClick={() => onNavigate('cart')}
          >
            Корзина
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </button>
          <button
            className={`nav-btn ${activePage === 'orders' ? 'active' : ''}`}
            onClick={() => onNavigate('orders')}
          >
            Мои заказы
            {orders.length > 0 && (
              <span className="badge orders-badge">{orders.length}</span>
            )}
          </button>
          <button
            className={`nav-btn ${activePage === 'testdrives' ? 'active' : ''}`}
            onClick={() => onNavigate('testdrives')}
          >
            Тест-драйвы
            {testDrives.length > 0 && (
              <span className="badge td-badge">{testDrives.length}</span>
            )}
          </button>

          {currentUser ? (
            <div className="user-menu">
              <div className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
              <span className="user-name">{currentUser.name}</span>
              <button className="logout-btn" onClick={() => dispatch(logout())}>
                Выйти
              </button>
            </div>
          ) : (
            <button className="auth-btn" onClick={() => setShowAuth(true)}>
              Войти
            </button>
          )}
        </nav>
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default Header;
