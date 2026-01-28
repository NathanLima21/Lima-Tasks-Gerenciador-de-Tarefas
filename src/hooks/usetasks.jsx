import { useEffect, useState } from 'react';

export function useTasks() {
  // Inicialização inteligente: carrega do localStorage sem precisar de useEffect extra
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority, category) => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      priority: priority || 'Média',
      category: category || 'Geral',
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return { tasks: filteredTasks, total: tasks.length, addTask, toggleTask, removeTask, setFilter, filter };
}