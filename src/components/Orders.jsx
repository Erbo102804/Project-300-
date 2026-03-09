import { useSelector } from 'react-redux';

function Orders({ onNavigate }) {
  const orders = useSelector((state) => state.cart.orders);

  const formatPrice = (price) =>
    price.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' сом';

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' });

  if (orders.length === 0) {
    return (
      <section className="orders-section">
        <h2>Мои заказы</h2>
        <div className="empty-state">
          <p>Заказов ещё нет</p>
          <button className="primary-btn" onClick={() => onNavigate('catalog')}>
            Перейти в каталог
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-section">
      <h2>Мои заказы</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Заказ #{order.id}</span>
              <span className="order-status">{order.status}</span>
              <span className="order-date">{formatDate(order.orderedAt)}</span>
            </div>

            <div className="order-customer">
              <strong>{order.customerInfo.name}</strong> ·{' '}
              {order.customerInfo.phone} · {order.customerInfo.email}
            </div>

            <div className="order-cars">
              {order.cars.map((car) => (
                <div key={car.id} className="order-car-item">
                  <span>{car.brand} {car.model} {car.year}</span>
                  <span>{formatPrice(car.price)}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              Итого: <strong>{formatPrice(order.totalPrice)}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;
