import React, { useState } from 'react';
import './taskform.css';

const TaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Trabalho');
  const [priority, setPriority] = useState('Média');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, category, priority);
      setText('');
    }
  };

  const categories = ['Trabalho', 'Estudo'];
  const priorities = ['Baixa', 'Média', 'Alta'];

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="+ Adicionar uma nova tarefa..."
          className="task-input"
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </div>

      <div className="form-filters">
        <div className="filter-group">
          <h4>CATEGORIA</h4>
          <div className="category-options">
            {categories.map(cat => (
              <label key={cat} className={`category-option ${category === cat ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="category"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  className="radio-input"
                />
                <span className="radio-label">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>PRIORIDADE</h4>
          <div className="priority-options">
            {priorities.map(pri => (
              <label key={pri} className={`priority-option ${priority === pri ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  checked={priority === pri}
                  onChange={() => setPriority(pri)}
                  className="radio-input"
                />
                <span className="radio-label">{pri}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

// Certifique-se de exportar como default
export default TaskForm;