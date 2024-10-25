import styles from '../styles/editNote.module.css';
import ver from '../storage/img/visibility.png';
import retroceder from '../storage/img/return.png';
import guardar from '../storage/img/save.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Newnote = () => {
  const [title, setTitle] = useState('Título de ejemplo');
  const [content, setContent] = useState('The Design of Everyday Things...');
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();

  const handleClick = () => {
    if (isChanged) {
      setShowModal(true); // Muestra el modal si hay cambios
    } else {
      navigate('/HomeScreen');
    }
  };

  const handleGuardar = async () => {
    if (!title || !content) {
      alert('El título y el contenido no pueden estar vacíos');
    } else {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:3000/api/guardar', {
          title: title,
          content: content,
        });
        alert('Nota guardada correctamente');
        console.log(response.data);
        setTitle('');
        setContent('');
        setIsChanged(false);
        navigate('/HomeScreen');
      } catch (error) {
        console.error('Error al guardar la nota:', error);
        alert('Hubo un error al guardar la nota');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDescartar = () => {
    setShowModal(false);
    navigate('/HomeScreen');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.icon}>
          <img src={retroceder} alt="return Icon" onClick={handleClick} />
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon1}>
            <img src={ver} alt="ver Icon" />
          </div>
          <div className={styles.icon2} onClick={handleGuardar}>
            <img src={guardar} alt="Guardar Icon" />
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <input
          type="text"
          placeholder="Escribe el título aquí"
          className={styles.input}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsChanged(true);
          }}
        />
        <textarea
          placeholder="Escribe el contenido aquí"
          className={styles.input2}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsChanged(true);
          }}
        />
      </div>
      {loading && <p>Guardando...</p>}

      {/* Modal personalizado */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Tienes cambios sin guardar. ¿Qué deseas hacer?</p>
            <button className={styles.modalButton} onClick={handleGuardar}>Guardar</button>
            <button className={styles.modalButton1} onClick={handleDescartar}>Descartar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newnote;
