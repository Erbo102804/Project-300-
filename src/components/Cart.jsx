import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, placeOrder } from '../store/actions/cartActions';

function Cart({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const totalPrice = cartItems.reduce((sum, car) => sum + car.price, 0);

  const formatPrice = (price) =>
    price.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' сом';

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(placeOrder(form));
    setShowForm(false);
    setForm({ name: '', phone: '', email: '' });
    onNavigate('orders');
  };

  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <h2>Корзина</h2>
        <div className="empty-state">
          <p>Корзина пуста</p>
          <button className="primary-btn" onClick={() => onNavigate('catalog')}>
            Перейти в каталог
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2>Корзина</h2>

      <div className="cart-items">
        {cartItems.map((car) => (
          <div key={car.id} className="cart-item">
            <img src={car.image} alt={`${car.brand} ${car.model}`} className="cart-item-image" />
            <div className="cart-item-info">
              <h4>{car.brand} {car.model} ({car.year})</h4>
              <p>{car.engine} · {car.transmission} · {car.color}</p>
            </div>
            <span className="cart-item-price">{formatPrice(car.price)}</span>
            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(car.id))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Итого:</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>

        <div className="cart-actions">
          <button className="secondary-btn" onClick={() => dispatch(clearCart())}>
            Очистить
          </button>
          <button className="primary-btn" onClick={() => setShowForm(true)}>
            Оформить заказ
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Оформление заказа</h3>
            <form onSubmit={handleOrder} className="order-form">
              <label>
                Имя
                <input
                  type="text"
                  required
                  value={form.name}
                  placeholder="Иван Иванов"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                Телефон
                <input
                  type="tel"
                  required
                  value={form.phone}
                  placeholder="+7 (999) 000-00-00"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  placeholder="ivan@mail.ru"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>
                  Отмена
                </button>
                <button type="submit" className="primary-btn">
                  Подтвердить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
