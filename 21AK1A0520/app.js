// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [number, setNumber] = useState('');
  const [average, setAverage] = useState(null);
  const [window, setWindow] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseFloat(number);

    if (isNaN(num)) {
      setError('Please enter a valid number');
      setAverage(null);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/average', {
        number: num,
      });
      setAverage(response.data.average);
      setWindow(response.data.window);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setAverage(null);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number:
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <button type="submit">Add Number</button>
      </form>
      {average !== null && (
        <div>
          <h2>Average: {average}</h2>
          <h3>Current Window: {window.join(', ')}</h3>
        </div>
      )}
      {error && (
        <div>
          <h2>Error: {error}</h2>
        </div>
      )}
    </div>
  );
}

export default App;