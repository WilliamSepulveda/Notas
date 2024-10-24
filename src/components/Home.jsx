import styles from '../styles/Home.module.css';
import add from '../storage/img/add.png';
import rafiki from '../storage/img/rafiki.png';
import search from '../storage/img/search.png';
import info from '../storage/img/info_outline.png';

import { useNavigate } from 'react-router-dom';



const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/NewNote');
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
        <img className={styles.image} src={rafiki} alt="Placeholder" />
        <p className={styles.text}>Create your first note!</p>
      </div>

      <div className={styles.roundedButton} onClick={handleClick}>
        <img src={add} alt="Add Note Icon" />
      </div>
    </div>
  );
};

export default Home;
