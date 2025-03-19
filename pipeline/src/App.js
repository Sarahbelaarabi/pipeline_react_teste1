// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // Un effet inutile qui ne dépend d'aucune variable
  useEffect(() => {
    console.log("Ce useEffect ne sert à rien !");
  }, []);

  // Une fonction non utilisée (code smell)
  const unusedFunction = () => {
    console.log("Cette fonction n'est jamais utilisée !");
  };

  // Une division par zéro potentielle (bug)
  const divideByZero = () => {
    const result = 10 / count;
    console.log("Résultat de la division :", result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => setCount(count + 1)}>
          Cliquez-moi ({count})
        </button>
        <button onClick={divideByZero}>
          Diviser par zéro
        </button>
      </header>
    </div>
  );
}

export default App;