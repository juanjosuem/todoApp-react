import React from 'react';

function ListItem({ item, onChangeDone, onRemoveItem }) {
  return (
    <li
      className={'list-group-item ' + (item.completed ? 'list-completed' : '')}>
      {item.title}
      <div className="pull-right">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onChangeDone.bind(this, item)}
        />
        <label
          className="btn btn-xs btn-danger"
          onClick={onRemoveItem.bind(this, item)}>
          Borrar
        </label>
      </div>
    </li>
  );
}

export default ListItem;
