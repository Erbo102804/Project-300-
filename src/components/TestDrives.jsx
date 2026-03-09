import { useDispatch, useSelector } from 'react-redux';
import { cancelTestDrive } from '../store/actions/testDriveActions';

function TestDrives({ onNavigate }) {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.testDrive.bookings);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  if (bookings.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🚗</div>
        <h2>Нет записей на тест-драйв</h2>
        <p>Выберите автомобиль в каталоге и запишитесь на тест-драйв</p>
        <button className="btn-primary" onClick={() => onNavigate('catalog')}>
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Мои тест-драйвы</h2>

      <div className="td-list">
        {bookings.map((b) => (
          <div key={b.id} className="td-card">
            <div className="td-car-info">
              <img src={b.car.image} alt={`${b.car.brand} ${b.car.model}`} className="td-car-image" />
              <div>
                <h3 className="td-car-title">{b.car.brand} {b.car.model}</h3>
                <span className="td-car-year">{b.car.year} г. · {b.car.bodyType}</span>
              </div>
            </div>

            <div className="td-details">
              <div className="td-detail">
                <span className="td-label">Клиент</span>
                <span className="td-value">{b.name}</span>
              </div>
              <div className="td-detail">
                <span className="td-label">Телефон</span>
                <span className="td-value">{b.phone}</span>
              </div>
              <div className="td-detail">
                <span className="td-label">Дата</span>
                <span className="td-value">{formatDate(b.date)}</span>
              </div>
              <div className="td-detail">
                <span className="td-label">Время</span>
                <span className="td-value">{b.time}</span>
              </div>
              {b.comment && (
                <div className="td-detail td-detail-full">
                  <span className="td-label">Комментарий</span>
                  <span className="td-value">{b.comment}</span>
                </div>
              )}
            </div>

            <div className="td-footer">
              <span className="td-status">{b.status}</span>
              <button
                className="td-cancel-btn"
                onClick={() => dispatch(cancelTestDrive(b.id))}
              >
                Отменить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestDrives;
