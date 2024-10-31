import { useEffect, useState } from 'react';
import styles from '../styles/HomeScreen.module.css';
import add from '../storage/img/add.png';
import search from '../storage/img/search.png';
import info from '../storage/img/info_outline.png';
import { useNavigate, Link } from 'react-router-dom';

const PaginaPrincipal = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false); // Estado para mostrar el input de búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(`http://localhost:5500/notes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setNotas(data);
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();
  }, []);

  const handleClick = () => {
    navigate('/Notas/NuevaNota');
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Cambia el estado para mostrar/ocultar el input
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Notes</div>
        <div className={styles.iconContainer}>
          <div className={styles.icon1} onClick={toggleSearch}>
            <img src={search} alt="Search Icon" />
          </div>
          <div className={styles.icon2}>
            <img src={info} alt="Info Icon" />
          </div>
        </div>
      </header>

      {showSearch && ( // Mostrar el input solo cuando showSearch es true
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Buscar notas..." 
            className={styles.searchInput} 
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.contenedorNotas}>
          {loading ? (
            <p>Cargando notas...</p>
          ) : notas.length > 0 ? (
            notas.map(nota => (
              <Link to={`/Notas/EditarNota/${nota.id}`} key={nota.id} style={{ textDecoration: 'none' }}>
                <div className={styles.nota} style={{ backgroundColor: nota}}>
                  <h1>{nota.title}</h1>
                  <p>{nota.content}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No hay notas para mostrar.</p>
          )}
        </div>
      </div>

      <div className={styles.roundedButton}>
        <img src={add} alt="Add Note Icon" onClick={handleClick} />
      </div>
    </div>
  );
};

export default PaginaPrincipal;
