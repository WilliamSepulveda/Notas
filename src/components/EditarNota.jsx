import styles from '../styles/editNote.module.css';
import ver from '../storage/img/visibility.png';
import retroceder from '../storage/img/return.png';
import guardar from '../storage/img/save.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const EditarNota = () => {
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/notes/${id}`);
        if (response.data && response.data.data) {
          const { title, content } = response.data.data;
          setOriginalTitle(title);
          setOriginalContent(content);
          setTitle(title);
          setContent(content);
        } else {
          setTitle('Título no disponible');
          setContent('Contenido no disponible');
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
    if (hasChanges()) {
      Swal.fire({
        title: 'Tienes cambios no guardados',
        text: "¿Seguro que quieres salir sin guardar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'No, quedarme'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/Notas/PaginaPrincipal'); // Navega si el usuario confirma
        }
      });
    } else {
      navigate('/Notas/PaginaPrincipal'); // Navega directamente si no hay cambios
    }
  };

  const hasChanges = () => {
    return title !== originalTitle || content !== originalContent;
  };

  const handleGuardar = async () => {
    if (title === '' && content === '') {
      Swal.fire('Error', 'No hay cambios para guardar.', 'error');
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5500/notes/${id}`, { title, content });
      console.log('Respuesta del servidor:', response.data); // Log de respuesta
      Swal.fire('Éxito', 'Nota guardada correctamente', 'success');
      navigate('/Notas/');
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      Swal.fire('Error', 'Hubo un error al guardar la nota. Por favor, inténtalo de nuevo.', 'error');
    }
  };
  

  if (loading) return <p>Cargando nota...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.icon} onClick={handleClick}>
          <img src={retroceder} alt="Icono de retorno" />
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon1}>
            <img src={ver} alt="Icono de ver" />
          </div>
          <div className={styles.icon2} onClick={handleGuardar}>
            <img src={guardar} alt="Icono de guardar" />
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
