import { useEffect, useState } from 'react';
import styles from '../styles/HomeScreen.module.css';
import add from '../storage/img/add.png';
import search from '../storage/img/search.png';
import info from '../storage/img/info_outline.png';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [notas, setNotas] = useState([]);
  const navegation = useNavigate();

  useEffect(() => {
    // Llamada a la API para obtener notas
    const fetchNotas = async () => {
      try {
        const response = await fetch('http://localhost:5500');
        const data = await response.json();
        setNotas(data);
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
    };

    fetchNotas();
  }, []);

  const handleClick = () => {
    navegation('/NewNote');
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
          {notas.map(nota => (
            <Link to={`/editNota/${nota.id}`} key={nota.id} style={{ textDecoration: 'none' }}>
              <div className={styles.nota} style={{ backgroundColor: nota.color }}>
                <p>{nota.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.roundedButton}>
        <img src={add} alt="Add Note Icon" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Home;