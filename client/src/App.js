import RouteTree from './RouteTree';
import Nav from './components/Nav/Nav';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <main>
        <RouteTree />
      </main>
    </div>
  );
}

export default App;
