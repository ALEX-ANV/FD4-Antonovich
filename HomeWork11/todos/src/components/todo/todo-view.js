import React from 'react'

import './todo.scss';

export default function Todo({ data }) {

  const { title, id, checked } = data;

  const getStatus = () => {
    return `todo${checked ? " checked" : ""}`;
  }

  return (
    <div className="todo-container" data-id={id}>
      <div className={getStatus()}>
        <h1>{title}</h1>
        <button type="button" className="remove">Удалить</button>
      </div>
    </div>
  )
}
