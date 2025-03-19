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
import { useState } from 'react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Textarea } from "/components/ui/textarea";

function App() {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = () => {
    try {
      setError('');
      // Capture console.log output
      let capturedOutput = '';
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput += args.join(' ') + '\n';
      };

      // Execute the code
      const func = new Function(code);
      func();

      // Restore original console.log
      console.log = originalConsoleLog;

      setOutput(capturedOutput.trim());
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setOutput('');
    }
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
      </header>
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Code Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[200px] font-mono"
              placeholder="Enter your code here..."
            />
            
            <Button onClick={runCode} className="w-full sm:w-auto">
              Run Code
            </Button>

            {output && (
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Output:</h3>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 rounded">
                <h3 className="font-semibold mb-2 text-red-700">Error:</h3>
                <pre className="whitespace-pre-wrap text-red-700">{error}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;