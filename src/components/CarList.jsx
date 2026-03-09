import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/actions/carsActions';
import CarCard from './CarCard';

const BODY_TYPES = ['all', 'Седан', 'Кроссовер', 'Внедорожник'];

function CarList() {
  const dispatch = useDispatch();
  const { list, filter } = useSelector((state) => state.cars);

  const filteredCars =
    filter === 'all' ? list : list.filter((car) => car.bodyType === filter);

  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h2>Каталог автомобилей</h2>
        <p className="catalog-subtitle">
          {filteredCars.length} автомобилей в наличии
        </p>
      </div>

      <div className="filter-bar">
        {BODY_TYPES.map((type) => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(type))}
          >
            {type === 'all' ? 'Все' : type}
          </button>
        ))}
      </div>

      {filteredCars.length === 0 ? (
        <div className="empty-state">Автомобили не найдены</div>
      ) : (
        <div className="cars-grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CarList;
