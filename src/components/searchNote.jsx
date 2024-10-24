import styles from '../styles/searchNote.module.css';
import cuate from '../storage/img/cuate.png'
import close from '../storage/img/close.png';

const searchNote = () => {
    return (
      <div className={styles.container}>
         <header className={styles.header}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="New note..."
            className={styles.input}
          />
          <img src={close} alt="delete" className={styles.deleteIcon} />
        </div>
      </header>
  
        <div className={styles.content}>
          <img className={styles.image} src={cuate}alt="Placeholder" />
          <p className={styles.text}>File not found. Try searching again.</p>
        </div>
      </div>
    );
  };
  
  export default searchNote;
  