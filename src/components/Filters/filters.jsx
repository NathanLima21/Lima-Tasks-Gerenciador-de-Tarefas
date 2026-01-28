import React from 'react';
import './filters.css';

const Filters = ({ activeFilter, onFilterChange, pendingCount, onClearCompleted }) => {
  const filters = ['Todas', 'Ativas', 'Completas'];

  return (
    <div className="filters-container">
      <div className="tasks-count">
        {pendingCount} {pendingCount === 1 ? 'item restante' : 'itens restantes'}
      </div>
      
      <div className="filter-buttons">
        {filters.map(filterName => (
          <button
            key={filterName}
            className={`filter-button ${activeFilter === filterName ? 'active' : ''}`}
            onClick={() => onFilterChange(filterName)}
          >
            {filterName}
          </button>
        ))}
      </div>

      <button className="clear-button" onClick={onClearCompleted}>
        Limpar completas
      </button>
    </div>
  );
};

export default Filters;