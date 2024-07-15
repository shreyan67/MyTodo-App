import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  function handleInputChange(event) {
    setNewItem(event.target.value);
  }

  function handleEditChange(event) {
    setEditValue(event.target.value);
  }

  function AddTodo() {
    if (newItem !== '') {
      setItems((i) => [...i, newItem]);
      setNewItem('');
    }
  }

  function RemoveTodo(index) {
    const updatedItems = items.filter((_, t) => t !== index);
    setItems(updatedItems);
  }

  function MoveDown(index) {
    if (index < items.length - 1) {
      const updatedItems = [...items];
      [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
      setItems(updatedItems);
    }
  }

  function MoveUp(index) {
    if (index > 0) {
      const updatedItems = [...items];
      [updatedItems[index], updatedItems[index - 1]] = [updatedItems[index - 1], updatedItems[index]];
      setItems(updatedItems);
    }
  }

  function EditTodo() {
    const updatedItems = items.map((item, index) =>
      index === editIndex ? editValue : item
    );
    setItems(updatedItems);
    setEditIndex(null);
    setEditValue('');
  }

  function ClearAll() {
    setItems([]);
  }

  return (
    <>
      <div>
        <button onClick={ClearAll}>Clear All</button>
      </div>
      <h2>Todo List</h2>
      <input
        type="text"
        className="text-box"
        placeholder="Enter Your Todo Item..."
        value={newItem}
        onChange={handleInputChange}
      />
      <button className="Add-button" onClick={AddTodo}>
        Add
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input type="checkbox" className="check-box" />
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                />
                <button className="Save-button" onClick={EditTodo}>
                  Save
                </button>
              </>
            ) : (
              <>
                {item}
                <button className="D-button" onClick={() => RemoveTodo(index)}>
                  Delete
                </button>
                <button className="S-button" onClick={() => MoveDown(index)}>
                  👇
                </button>
                <button className="S-button" onClick={() => MoveUp(index)}>
                  ☝
                </button>
                <button
                  className="Edit-button"
                  onClick={() => {
                    setEditIndex(index);
                    setEditValue(item);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
