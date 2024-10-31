import styles from '../styles/editNote.module.css';
import ver from '../storage/img/visibility.png';
import retroceder from '../storage/img/return.png';
import guardar from '../storage/img/save.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const EditarNota = () =>{
  const [title, setTitle] = useState('este es un ejemplo de titulo ');
  const [content, setContent] = useState('este es un ejemplo de contenido ');
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isChanged) {
      setShowModal(true); // Show modal if there are unsaved changes
    } else {
      navigate('/Notas/PaginaPrincipal'); 
    }
  };

  const handleGuardar = async () => {
    if (!title || !content) {
      alert('El título y el contenido no pueden estar vacíos');
      return;
    }

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
      navigate('/Notas/HomeScreen'); // Navigate to home screen or specific page after saving
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      alert('Hubo un error al guardar la nota. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDescartar = () => {
    setShowModal(false); // Close the modal
    navigate('/Notas/PaginaPrincipal'); // Navigate to home screen
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
      {loading && <p>Guardando...</p>} {/* Loading indicator */}

      {/* Custom Modal for unsaved changes */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Tienes cambios sin guardar. ¿Qué deseas hacer?</p>
            <button className={styles.modalButton} onClick={handleGuardar}>Guardar</button>
            <button className={styles.modalButton1} onClick={handleDescartar}>Descartar</button>
            <button className={styles.modalButton2} onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarNota;
