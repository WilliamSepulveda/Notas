import styles from '../styles/HomeScreen.module.css';
import add from '../storage/img/add.png';
import search from '../storage/img/search.png';
import info from '../storage/img/info_outline.png';
import { useNavigate, Link } from 'react-router-dom'; // Asegúrate de importar Link

const Home = () => {
  const navegation = useNavigate();

  const handleClick = () => {
    navegation('/NewNote');
  }

  const notas = [
    { id: 1, text: "UI concepts worth existing", color: '#ff99ff' },
    { id: 2, text: "Book Review: The Design of Everyday Things by Don Norman", color: '#ff9999' },
    { id: 3, text: "Animes produced by Ufotable", color: '#99ff99' },
    { id: 4, text: "Mangas planned to read", color: '#ffff99' },
  ];

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
