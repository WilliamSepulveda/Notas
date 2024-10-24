import styles from '../styles/Home.module.css';
import add from '../storage/img/add.png';
import cuate from '../storage/img/cuate.png';


const Home = () => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>Notes</div>
      <div className={styles.noteMessage}>Create your first note!</div>
      <img className={styles.image} src= {cuate} alt="Placeholder" />
      <div className={styles.button1} />
      <div className={styles.icon1}>
        {/* Asegúrate de tener contenido aquí, como un ícono */}
        <img src="" alt="Icon 1" />
      </div>
      <div className={styles.button2} />
      <div className={styles.icon2}>
        {/* Asegúrate de tener contenido aquí, como un ícono */}
        <img src="../storage/img/add.png" alt="Icon 2" />
      </div>
      <div className={styles.roundedButton} />
      <div className={styles.roundedIcon}>
        {/* Asegúrate de tener contenido aquí, como un ícono */}
        <img src={add} alt="Rounded Icon" />
      </div>
    </div>
  );
};

export default Home;
