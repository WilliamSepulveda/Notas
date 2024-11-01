import { Routes, Route } from 'react-router-dom';

import NotaVacia from '../components/NotaVacia';
import NuevaNota from '../components/NuevaNota';
import PaginaPrincipal from '../components/PaginaPrincipal';
import EditarNota from '../components/EditarNota';

import EntrarUsuario from '../components/EntrarUsuario';
import Login from '../components/Login';
import Signup from '../components/SignUp';

function AppRouter() {
  return (
    <Routes>
      <Route path="/Notas" element={<EntrarUsuario />} />
      <Route path="/Notas/Login" element={<Login />} />
      <Route path="/Notas/Signup" element={<Signup />} />
      <Route path="/Notas/NotaVacia" element={<NotaVacia />} />
      <Route path="/Notas/NuevaNota" element={<NuevaNota />} />
      <Route path="/Notas/PaginaPrincipal" element={<PaginaPrincipal />} />
      <Route path="/Notas/EditarNota/:id"element={<EditarNota />} />
    </Routes>
  );
}

export default AppRouter;
