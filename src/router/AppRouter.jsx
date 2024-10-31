import { Routes, Route } from 'react-router-dom';

import NotaVacia from '../components/NotaVacia';
import NuevaNota from '../components/NuevaNota';
import PaginaPrincipal from '../components/PaginaPrincipal';
import EditarNota from '../components/EditarNota';
import BuscarNota from '../components/BuscarNota'; // Changed to uppercase

function AppRouter() {
  return (
    <Routes>
      <Route path="/Notas" element={<NotaVacia />} />
      <Route path="/Notas/NuevaNota" element={<NuevaNota />} />
      <Route path="/Notas/PaginaPrincipal" element={<PaginaPrincipal />} />
      <Route path="/Notas/EditarNota" element={<EditarNota />} />
      <Route path="/Notas/BuscarNota" element={<BuscarNota />} /> {/* Changed to uppercase */}
    </Routes>
  );
}

export default AppRouter;
