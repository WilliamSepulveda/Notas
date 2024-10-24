import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewNote from './components/NewNote';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewNote" element={<NewNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
