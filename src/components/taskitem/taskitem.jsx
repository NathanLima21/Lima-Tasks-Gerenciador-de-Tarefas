import React from 'react';
import './taskitem.css';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const getPriorityClass = () => {
    switch(task.priority) {
      case 'Alta': return 'priority-high';
      case 'Média': return 'priority-medium';
      case 'Baixa': return 'priority-low';
      default: return '';
    }
  };

  const getCategoryClass = () => {
    switch(task.category) {
      case 'Trabalho': return 'category-work';
      case 'Estudo': return 'category-study';
      default: return '';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="task-checkbox"
        />
        
        <div className="task-text">
          <span className={`task-name ${task.completed ? 'strikethrough' : ''}`}>
            {task.text}
          </span>
          
          <div className="task-meta">
            <span className={`category-tag ${getCategoryClass()}`}>
              {task.category}
            </span>
            <span className={`priority-tag ${getPriorityClass()}`}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};

export default TaskItem;