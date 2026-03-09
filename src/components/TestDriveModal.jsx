import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bookTestDrive } from '../store/actions/testDriveActions';

function TestDriveModal({ car, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bookTestDrive({ car, ...form }));
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h2>Тест-драйв записан!</h2>
            <p>
              <strong>{car.brand} {car.model}</strong> — {form.date} в {form.time}
            </p>
            <p className="modal-success-sub">Мы свяжемся с вами по номеру {form.phone}</p>
            <button className="modal-btn" onClick={onClose}>Отлично</button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Запись на тест-драйв</h2>
            <p className="modal-subtitle">
              {car.brand} {car.model} · {car.year} г.
            </p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <label>
                Ваше имя
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  required
                />
              </label>

              <label>
                Телефон
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 000-00-00"
                  required
                />
              </label>

              <div className="modal-row">
                <label>
                  Дата
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </label>
                <label>
                  Время
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    min="09:00"
                    max="20:00"
                    required
                  />
                </label>
              </div>

              <label>
                Комментарий (необязательно)
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Любые пожелания..."
                  rows={3}
                />
              </label>

              <div className="modal-actions">
                <button type="button" className="modal-btn modal-btn-outline" onClick={onClose}>
                  Отмена
                </button>
                <button type="submit" className="modal-btn">
                  Записаться
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default TestDriveModal;
