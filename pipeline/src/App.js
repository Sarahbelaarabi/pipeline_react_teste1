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

import React, { useState, useEffect, useCallback, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";

// Définition du type pour les entrées du formulaire
// Utilisation d'un commentaire JSDoc pour documenter la structure
/**
 * @typedef {Object} FormData
 * @property {number} number1 - Premier nombre
 * @property {number} number2 - Deuxième nombre
 */

function App() {
  const [formData, setFormData] = useState<FormData>({ number1: 0, number2: 0 });
  const [result, setResult] = useState<number | null>(null);

  // Fonction pour mettre à jour les inputs
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  }, []);

  // Calcul du résultat avec useMemo pour optimiser les performances
  const sum = useMemo(() => {
    return formData.number1 + formData.number2;
  }, [formData]);

  // Simule un appel API et met à jour le résultat
  useEffect(() => {
    setTimeout(() => setResult(sum), 500); // Simule une latence réseau
  }, [sum]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Formulaire de calcul avancé</p>

        {/* Formulaire pour entrer deux nombres */}
        <div>
          <input
            type="number"
            name="number1"
            value={formData.number1}
            onChange={handleChange}
            placeholder="Nombre 1"
          />
          <input
            type="number"
            name="number2"
            value={formData.number2}
            onChange={handleChange}
            placeholder="Nombre 2"
          />
          <button onClick={() => setResult(sum)}>Calculer</button>
        </div>

        {/* Affichage du résultat */}
        {result !== null && <p>Résultat : {result}</p>}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
