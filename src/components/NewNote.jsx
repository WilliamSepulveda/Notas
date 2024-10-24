import styles from '../styles/NewNote.module.css';
import ver from '../storage/img/visibility.png';
import retroceder from '../storage/img/return.png';
import guardar from '../storage/img/save.png';


const Newnote = () => {
  return (

    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.icon}>
            <img src={retroceder} alt="return Icon" />
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon1}>
            <img src={ver} alt="ver Icon" />
          </div>
          <div className={styles.icon2}>
            <img src={guardar} alt="Info Icon" />
          </div>
        </div>
      </header>
        <div className={styles.content}>
            <input
                type="text"
                placeholder="Title"
                className={styles.input}
            />
            <textarea
                type="text"
                placeholder='Type something'
                className={styles.input2}
            />
        </div>
    </div>
  );
};

export default Newnote;
