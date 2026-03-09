import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import TestDriveModal from './TestDriveModal';

function CarCard({ car }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === car.id);
  const [showModal, setShowModal] = useState(false);

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeFromCart(car.id));
    } else {
      dispatch(addToCart(car));
    }
  };

  const formatPrice = (price) =>
    price.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' сом';

  return (
    <div className={`car-card ${!car.inStock ? 'out-of-stock' : ''}`}>
      <div className="car-image-wrapper">
        <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image" />
        {!car.inStock && <div className="stock-badge">Нет в наличии</div>}
      </div>

      <div className="car-info">
        <h3 className="car-title">
          {car.brand} {car.model}
        </h3>
        <span className="car-year">{car.year} г.</span>

        <div className="car-specs">
          <div className="spec">
            <span className="spec-label">Двигатель</span>
            <span className="spec-value">{car.engine}</span>
          </div>
          <div className="spec">
            <span className="spec-label">КПП</span>
            <span className="spec-value">{car.transmission}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Цвет</span>
            <span className="spec-value">{car.color}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Тип</span>
            <span className="spec-value">{car.bodyType}</span>
          </div>
        </div>

        <p className="car-description">{car.description}</p>

        <div className="car-footer">
          <span className="car-price">{formatPrice(car.price)}</span>
          <div className="car-actions">
            <button
              className="test-drive-btn"
              onClick={() => setShowModal(true)}
              disabled={!car.inStock}
            >
              Тест-драйв
            </button>
            <button
              className={`cart-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={handleCartToggle}
              disabled={!car.inStock}
            >
              {isInCart ? 'Убрать' : 'Выбрать'}
            </button>
          </div>
        </div>
      </div>

      {showModal && <TestDriveModal car={car} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CarCard;
