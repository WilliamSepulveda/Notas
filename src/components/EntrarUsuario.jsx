import { useNavigate } from 'react-router-dom';
import '../styles/EntrarUsuario.css';
import start from '../storage/img/Illustration.svg';

const EntrarUsuario = () => {
    const navigate = useNavigate(); // Usa useNavigate para manejar la navegación

    const handleLoginClick = () => {
        navigate('/Notas/Login'); // Cambia esto a la ruta correcta para el componente Login
    };

    const handleSignUpClick = () => {
        navigate('/Notas/signup'); // Cambia esto a la ruta correcta para el componente SignUp
    };

    return (
        <main>
            <section className="section__imagen">
                <div className="section__container">
                    <img src={start} alt="Illustration" />
                </div>
                <div className="section__text">
                    <h1>Explore the app</h1>
                    <small>Now your finances are in one place and always under control</small>
                </div>
            </section>
            <section className="section__button">
                <button onClick={handleLoginClick}>Sign In</button>
                <button onClick={handleSignUpClick}>Create account</button>
            </section>
        </main>
    );
};

export default EntrarUsuario;
