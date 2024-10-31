import styles from '../styles/editNote.module.css';
import ver from '../storage/img/visibility.png';
import retroceder from '../storage/img/return.png';
import guardar from '../storage/img/save.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditarNota = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtain the note ID from URL params

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/notes/${id}`);
  
        // Check if the response data is correct
        if (response.data && response.data.data) {
          console.log('Response data:', response.data.data); // Log the entire response data
  
          // Extract title and content from the response
          const { title, content } = response.data.data;
  
          // Check for title and content
          if (title && content) {
            setTitle(title);
            setContent(content);
            console.log('Datos de la nota cargados:', response.data.data); // Log when data is loaded
          } else {
            // Handle case where title or content is missing
            setTitle('Título no disponible');
            setContent('Contenido no disponible');
            console.log('No se encontraron datos para esta nota'); // Log if no data found
          }
        } else {
          // Handle case where response is empty
          setTitle('Título no disponible');
          setContent('Contenido no disponible');
          console.log('La respuesta está vacía'); // Log if response is empty
        }
      } catch (error) {
        console.error('Error al cargar la nota:', error);
        setError('Error al cargar la nota.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchNote();
  }, [id]);
  
  

  const handleClick = () => {
    navigate('/Notas/');
  };

  const handleGuardar = async () => {
    try {
      await axios.put(`http://localhost:5500/notes/${id}`, { title, content });
      alert('Nota guardada correctamente');
      navigate('/Notas/');
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      alert('Hubo un error al guardar la nota. Por favor, inténtalo de nuevo.');
    }
  };

  if (loading) return <p>Cargando nota...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.icon} onClick={handleClick}>
          <img src={retroceder} alt="return Icon" />
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Escribe el contenido aquí"
          className={styles.input2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditarNota;
