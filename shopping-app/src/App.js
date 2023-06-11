import React, { useEffect, useState } from 'react';

function App() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [users, setUsers] = useState([]);
  const [newShoppingList, setNewShoppingList] = useState({ name: '', quantity: '', price: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', phone_number: '' });

  useEffect(() => {
    // Fetch shopping lists
    fetch('/shopping_lists')
      .then((response) => response.json())
      .then((data) => setShoppingLists(data));

    // Fetch users
    fetch('/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleShoppingListSubmit = (e) => {
    e.preventDefault();
    // Create new shopping list
    fetch('/shopping_lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShoppingList),
    })
      .then((response) => response.json())
      .then((data) => {
        setShoppingLists([...shoppingLists, data]);
        setNewShoppingList({ name: '', quantity: '', price: '' });
      });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // Create new user
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({ name: '', email: '', phone_number: '' });
      });
  };

  const handleShoppingListDelete = (id) => {
    // Delete shopping list
    fetch(`/shopping_lists/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setShoppingLists(shoppingLists.filter((shoppingList) => shoppingList.id !== id));
    });
  };

  const handleUserDelete = (id) => {
    // Delete user
    fetch(`/users/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div>
      <h1>Shopping Lists</h1>
      <ul>
        {shoppingLists.map((shoppingList) => (
          <li key={shoppingList.id}>
            {shoppingList.name}
            <button onClick={() => handleShoppingListDelete(shoppingList.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add Shopping List</h2>
      <form onSubmit={handleShoppingListSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newShoppingList.name}
          onChange={(e) => setNewShoppingList({ ...newShoppingList, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={newShoppingList.quantity}
          onChange={(e) => setNewShoppingList({ ...newShoppingList, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newShoppingList.price}
          onChange={(e) => setNewShoppingList({ ...newShoppingList, price: e.target.value
          })}
        />
        <button type="submit">Add Shopping List</button>
      </form>

      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleUserDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newUser.phone_number}
          onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
