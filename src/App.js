import React from 'react';
import './assets/css/App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Link to="./todo" className="link">Todo</Link>
    </div>
  );
}

export default App;
