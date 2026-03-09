import { useState } from 'react';
import Header from './components/Header';
import CarList from './components/CarList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('catalog');

  return (
    <div className="app">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        {activePage === 'catalog' && <CarList />}
        {activePage === 'cart' && <Cart onNavigate={setActivePage} />}
        {activePage === 'orders' && <Orders onNavigate={setActivePage} />}
      </main>
      <footer className="footer">
        <p>&copy; 2024 АвтоСалон Premium &middot; Все права защищены</p>
      </footer>
    </div>
  );
}

export default App;
