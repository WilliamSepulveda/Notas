import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewNote from './components/NewNote';
import HomeScreen from './components/HomeScreen';
import EditNota from './components/editNota';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewNote" element={<NewNote />} />
          <Route path="/HomeScreen" element={<HomeScreen />}/>
          <Route path="editNota" element={<EditNota />}/>
        </Routes>
      </Router>
    </div> 
  );
}

export default App;
