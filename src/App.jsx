

import React, { useState } from 'react';
import './App.css';
import './styles/global.css'; 

function App() {
  // Estado para categorias
  const [categories, setCategories] = useState(['TRABALHO', 'PESSOAL', 'ESTUDO', 'SAÚDE']);
  
  // Estado para tarefas
  const [tasks, setTasks] = useState([
    { id: 1, text: "Estudar React", category: "ESTUDO", completed: false, priority: "ALTA" },
    { id: 2, text: "Reunião com time", category: "TRABALHO", completed: true, priority: "MÉDIA" },
    { id: 3, text: "Academia", category: "SAÚDE", completed: false, priority: "BAIXA" },
  ]);
  
  // Estados do formulário de TAREFAS
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TRABALHO');
  const [selectedPriority, setSelectedPriority] = useState('MÉDIA');
  const [filter, setFilter] = useState('Todas');
  
  // Estados do formulário de CATEGORIAS
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Função para normalizar nomes de classes (remove acentos)
  const normalizeClassName = (str) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // 1. ADICIONAR TAREFA
  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!newTask.trim()) {
      alert('Digite uma tarefa!');
      return;
    }
    
    const task = {
      id: Date.now(),
      text: newTask,
      category: selectedCategory,
      completed: false,
      priority: selectedPriority
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // 2. ADICIONAR CATEGORIA
  const handleAddCategory = (e) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      alert('Digite um nome para a categoria!');
      return;
    }
    
    const categoryName = newCategory.toUpperCase().trim();
    
    // Verificar se categoria já existe
    if (categories.includes(categoryName)) {
      alert('Esta categoria já existe!');
      return;
    }
    
    // ADICIONAR À LISTA DE CATEGORIAS
    setCategories(prevCategories => [...prevCategories, categoryName]);
    
    // SELECIONAR A NOVA CATEGORIA automaticamente
    setSelectedCategory(categoryName);
    
    // Limpar e fechar
    setNewCategory('');
    setShowAddCategory(false);
  };

  // 3. MARCAR/DESMARCAR TAREFA
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 4. DELETAR TAREFA
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 5. LIMPAR TAREFAS COMPLETAS
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // 6. FILTRAR TAREFAS
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Ativas') return !task.completed;
    if (filter === 'Completas') return task.completed;
    return true;
  });

  // 7. CONTAR TAREFAS PENDENTES
  const pendingCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="app">
      <header className="header">
        <h1>Lima Tasks</h1>
        <p className="subtitle">Seu gerenciador de tarefas inteligente</p>
      </header>

      <main className="main">
        {/* FORMULÁRIO DE TAREFA */}
        <form className="form" onSubmit={handleAddTask}>
          <div className="input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="+ Adicionar uma nova tarefa..."
              className="task-input"
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </div>
        </form>

        {/* FILTROS */}
        <div className="filters-grid">
          {/* CATEGORIAS */}
          <div className="filter-group">
            <h3>CATEGORIA</h3>
            <div className="category-list">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-btn ${selectedCategory === cat ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              
              <button
                type="button"
                className="add-cat-btn"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                + ADD
              </button>
            </div>
            
            {showAddCategory && (
              <form className="new-category-form" onSubmit={handleAddCategory}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nome da nova categoria..."
                  className="new-category-input"
                  autoFocus
                />
                <button type="submit" className="save-cat-btn">
                  Salvar
                </button>
                <button 
                  type="button" 
                  className="cancel-cat-btn"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategory('');
                  }}
                >
                  Cancelar
                </button>
              </form>
            )}
          </div>

          {/* PRIORIDADES */}
          <div className="filter-group">
            <h3>PRIORIDADE</h3>
            <div className="priority-list">
              {['BAIXA', 'MÉDIA', 'ALTA'].map(pri => (
                <button
                  key={pri}
                  type="button"
                  className={`pri-btn ${selectedPriority === pri ? 'selected' : ''} ${normalizeClassName(pri)}`}
                  onClick={() => setSelectedPriority(pri)}
                >
                  {pri}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <div className="divider"></div>

        {/* CONTROLES */}
        <div className="controls">
          <div className="counter">
            <span className="counter-number">{pendingCount}</span>
            <span className="counter-text">ITEMS RESTANTES</span>
          </div>
          
          <div className="filter-controls">
            <button 
              className={`filter-control-btn ${filter === 'Ativas' ? 'active' : ''}`}
              onClick={() => setFilter('Ativas')}
            >
              ATIVAS
            </button>
            <button 
              className={`filter-control-btn ${filter === 'Completas' ? 'active' : ''}`}
              onClick={() => setFilter('Completas')}
            >
              COMPLETAS
            </button>
            <button className="clear-btn" onClick={clearCompleted}>
              LIMPAR COMPLETAS
            </button>
          </div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <div className="divider"></div>

        {/* LISTA DE TAREFAS */}
        <div className="tasks-section">
          <h3 className="tasks-title">Tarefas ({filteredTasks.length})</h3>
          
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma tarefa encontrada. Adicione uma tarefa acima!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    
                    <div className="task-info">
                      <p className="task-text">{task.text}</p>
                      <div className="task-tags">
                        <span className="task-category">{task.category}</span>
                        <span className={`task-priority ${normalizeClassName(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      className="delete-task-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="task-status">
                    {task.completed ? (
                      <span className="status-completed">✓ CONCLUÍDA</span>
                    ) : (
                      <span className="status-pending">PENDENTE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
