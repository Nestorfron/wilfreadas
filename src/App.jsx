import React, { useEffect, useState } from 'react';
import { getItems, addItem } from './api';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  const handleAddItem = () => {
    const itemName = prompt('Enter the item name:');
    if (itemName) {
      addItem({ name: itemName }).then(() => {
        getItems().then(data => setItems(data));
      });
    }
  };

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default App;
