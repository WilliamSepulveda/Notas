import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home';
import NewNote from '../components/NewNote';
import HomeScreen from '../components/HomeScreen';
import EditNota from '../components/EditNota';
import SearchNote from '../components/SearchNote'; // Changed to uppercase

function AppRouter() {
  return (
    <Routes>
      <Route path="/Notas" element={<Home />} />
      <Route path="/Notas/NewNote" element={<NewNote />} />
      <Route path="/Notas/HomeScreen" element={<HomeScreen />} />
      <Route path="/Notas/EditNota" element={<EditNota />} />
      <Route path="/Notas/SearchNote" element={<SearchNote />} /> {/* Changed to uppercase */}
    </Routes>
  );
}

export default AppRouter;
