import React from 'react';
import './ToDoItem.css';

const ToDoCheckbox = ({ onClick, done }) => {
  return (
    <div className="circle non-selectable" onClick={onClick(!done)}>{done ? 'X' : '\u00A0'}</div>
  )
}

const ToDoItem = ({onClick, onChange, done, name}) => {
  return (
    <div className="item">
      <ToDoCheckbox done={done} onClick={onClick}/>
      <div className="item__name">
        <input onChange={onChange} value={name}/>
      </div>
    </div>
  );
}


export {ToDoItem, ToDoCheckbox};
