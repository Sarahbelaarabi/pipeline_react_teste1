import logo from './logo.svg';
import './App.css';

function App() {
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

        {/* Code dupliqué, violation de la règle des lignes dupliquées */}
        <p>Learn React</p> 
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a> {/* Dupliqué */}

        {/* Ajouter du code qui génère des issues */}
        <button>Non utilisé</button> {/* Provoque un problème de variable non utilisée */}
      </header>
    </div>
  );
}

export default App;
