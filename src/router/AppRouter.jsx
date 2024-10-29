import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home';
import NewNote from '../components/NewNote';
import HomeScreen from '../components/HomeScreen';
import EditNota from '../components/editNota';

function AppRouter() {
  return (
    <Routes>
      <Route path="/Notas" element={<Home />} />
      <Route path="/Notas/NewNote" element={<NewNote />} />
      <Route path="/Notas/HomeScreen" element={<HomeScreen />} />
      <Route path="/Notas/editNota" element={<EditNota />} />
    </Routes>
  );
}

export default AppRouter;
