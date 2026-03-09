import { useSelector } from 'react-redux';

function Header({ activePage, onNavigate }) {
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.cart.orders);

  return (
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
      </nav>
    </header>
  );
}

export default Header;
