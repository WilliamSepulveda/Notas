import styles from '../styles/NewNote.module.css';
import cuate from '../storage/img/cuate.png'
import close from '../storage/img/close.png';

const NewNote = () => {
    return (
      <div className={styles.container}>
         <header className={styles.header}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Food Recipe"
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
  
  export default NewNote;
  