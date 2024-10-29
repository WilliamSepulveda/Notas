import styles from '../styles/NewNote.module.css';
import ver from '../storage/img/visibility.png';
import retroceder from '../storage/img/return.png';
import guardar from '../storage/img/save.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Para hacer la petición a la base de datos

const Newnote = () => {
  const [title, setTitle] = useState(''); // Estado para el título
  const [content, setContent] = useState(''); // Estado para el contenido
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Notas');
  };

  const handleGuardar = async () => {
    if (!title || !content) {
      alert('El título y el contenido no pueden estar vacíos'); // Verifica si hay datos
    } else {
      try {
        setLoading(true);
        // Aquí se hace la petición para guardar en la base de datos
        const response = await axios.post('http://localhost:3000/api/guardar', {
          title: title,
          content: content,
        });
        alert('Nota guardada correctamente');
        console.log(response.data);
        setTitle(''); // Limpia el campo del título
        setContent(''); // Limpia el campo del contenido
        navigate('/HomeScreen');
      } catch (error) {
        console.error('Error al guardar la nota:', error);
        alert('Hubo un error al guardar la nota');
      } finally {
        setLoading(false);
      }
    }
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
          placeholder="Title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título
        />
        <textarea
          placeholder="Type something"
          className={styles.input2}
          value={content}
          onChange={(e) => setContent(e.target.value)} // Actualiza el estado del contenido
        />
      </div>
      {loading && <p>Guardando...</p>} {/* Indicador de carga */}
    </div>
  );
};

export default Newnote;
