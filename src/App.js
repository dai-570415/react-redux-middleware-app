import React from 'react';
import './assets/css/App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <nav>
        Home &gt; <Link to="./todo" className="link">Todo</Link>
      </nav>
      <main>
        Hello!React!
      </main>
    </div>
  );
}

export default App;
