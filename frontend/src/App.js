import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [dbMessage, setDbMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.text())
      .then(message => setMessage(message))
      .catch(error => console.error('Error fetching message:', error));

    fetch('http://localhost:5000/db')
      .then(response => response.json())
      .then(data => setDbMessage(data[0]?.now || 'Error fetching database time'))
      .catch(error => console.error('Error fetching database time:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <p>Database Time: {dbMessage}</p>
      </header>
    </div>
  );
}

export default App;
