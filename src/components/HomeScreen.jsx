import styles from '../styles/HomeScreen.module.css';
import add from '../storage/img/add.png';
import search from '../storage/img/search.png';
import info from '../storage/img/info_outline.png';

import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navegation = useNavigate();

  const handleClick = () =>{
    navegation('/NewNote');
  }

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
        <div className={styles.nota} style={{ backgroundColor: '#ff99ff' }}>
          <p>UI concepts worth existing</p>
        </div>
        <div className={styles.nota} style={{ backgroundColor: '#ff9999' }}>
          <p>Book Review: The Design of Everyday Things by Don Norman</p>
        </div>
        <div className={styles.nota} style={{ backgroundColor: '#99ff99' }}>
          <p>Animes produced by Ufotable</p>
        </div>
        <div className={styles.nota} style={{ backgroundColor: '#ffff99' }}>
          <p>Mangas planned to read</p>
        </div>
      </div>
    </div>


      <div className={styles.roundedButton}>
        <img src={add} alt="Add Note Icon" onClick={handleClick}/>
      </div>
    </div>
  );
};

export default Home;
