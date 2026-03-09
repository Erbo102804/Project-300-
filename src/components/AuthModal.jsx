import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../store/actions/authActions';

function AuthModal({ onClose }) {
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.auth);
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [regError, setRegError] = useState('');

  // Закрываем модал после успешной авторизации
  useEffect(() => {
    if (currentUser) onClose();
  }, [currentUser, onClose]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginForm));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) {
      setRegError('Пароли не совпадают');
      return;
    }
    if (regForm.password.length < 6) {
      setRegError('Пароль должен быть не менее 6 символов');
      return;
    }
    setRegError('');
    const { confirm, ...userData } = regForm;
    dispatch(register(userData));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
          >
            Регистрация
          </button>
        </div>

        {tab === 'login' ? (
          <form className="modal-form" onSubmit={handleLogin}>
            <h2 className="modal-title">Вход в аккаунт</h2>

            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="example@mail.com"
                required
              />
            </label>

            <label>
              Пароль
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••"
                required
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="modal-btn auth-submit-btn">
              Войти
            </button>

            <p className="auth-switch">
              Нет аккаунта?{' '}
              <button type="button" className="auth-link" onClick={() => setTab('register')}>
                Зарегистрироваться
              </button>
            </p>
          </form>
        ) : (
          <form className="modal-form" onSubmit={handleRegister}>
            <h2 className="modal-title">Создать аккаунт</h2>

            <label>
              Имя
              <input
                type="text"
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                placeholder="Иван Иванов"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={regForm.email}
                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                placeholder="example@mail.com"
                required
              />
            </label>

            <label>
              Телефон
              <input
                type="tel"
                value={regForm.phone}
                onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                placeholder="+996 700 000 000"
                required
              />
            </label>

            <div className="modal-row">
              <label>
                Пароль
                <input
                  type="password"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  placeholder="••••••"
                  required
                />
              </label>
              <label>
                Повторите пароль
                <input
                  type="password"
                  value={regForm.confirm}
                  onChange={(e) => setRegForm({ ...regForm, confirm: e.target.value })}
                  placeholder="••••••"
                  required
                />
              </label>
            </div>

            {(regError || error) && <p className="auth-error">{regError || error}</p>}

            <button type="submit" className="modal-btn auth-submit-btn">
              Зарегистрироваться
            </button>

            <p className="auth-switch">
              Уже есть аккаунт?{' '}
              <button type="button" className="auth-link" onClick={() => setTab('login')}>
                Войти
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
