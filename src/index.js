import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import TodoList from './TodoList';

export default function TodoApp() {
  return (
    <div className="App container">
      <h1>Lista de Items</h1>
      <TodoList />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<TodoApp />, rootElement);
