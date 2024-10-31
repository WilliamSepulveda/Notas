import { useEffect, useState } from 'react';
import styles from '../styles/HomeScreen.module.css';
import add from '../storage/img/add.png';
import search from '../storage/img/search.png';
import info from '../storage/img/info_outline.png';
import { useNavigate, Link } from 'react-router-dom';

const PaginaPrincipal = () => {
  const [notas, setNotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(`/notes/{}`); 
        const data = await response.json();
        console.log(data);  // Verificar qué datos se están obteniendo
        setNotas(data);
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
    };

    fetchNotas();
  }, []);

  const handleClick = () => {
    navigate('/Notas/NuevaNota');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Notes</div>
        <div className={styles.iconContainer}>
          <div className={styles.icon1}>
            <img src={search} alt="Search Icon" />
          </div>
          <div className={styles.icon2}>
            <img src={info} alt="Info Icon" />
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.contenedorNotas}>
          {notas.length > 0 ? (
            notas.map(nota => (
              <Link to={`/Notas/EditarNota/${nota.id}`} key={nota.id} style={{ textDecoration: 'none' }}>
                <div className={styles.nota} style={{ backgroundColor: nota.color || '#FFF' }}>
                  <p>{nota.text}</p>
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