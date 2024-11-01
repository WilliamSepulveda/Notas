import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/LogIn.css'; 
import Google from '../storage/img/Google.svg';
import Apple from '../storage/img/Apple.svg';
import Facebook from '../storage/img/Facebook.svg';
import Star from '../storage/img/Star.svg';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        // Validar formato de correo electrónico
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Validar el correo electrónico
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Validar la contraseña (puedes agregar más reglas aquí)
        if (password.length < 6) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5500/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('no compartas tu clave')
                navigate('/Notas/PaginaPrincipal'); // Redirigir después del inicio de sesión
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            setErrorMessage('Error durante el inicio de sesión.'); // Mensaje de error general
        }
    };

    return (
        <>
            <header>
                <div className="header__logo">
                    <img src={Star} alt="" />
                </div>
            </header>
            <main>
                <section className="section__form">
                    <h1>Log in</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form className="login" onSubmit={handleLogin}>
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email" 
                            required 
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password" 
                            required 
                        />
                        <span>Forgot password?</span>
                        <button type="submit" className="submit-button">Log in</button>
                    </form>
                </section>
                <section>
                    <div className="section__line">
                        <span>Or Login with</span>
                    </div>
                    <div className="section__social">
                        <button><img src={Facebook} alt="Facebook" /></button>
                        <button><img src={Google} alt="Google" /></button>
                        <button><img src={Apple} alt="Apple" /></button>
                    </div>
                </section>
            </main>
            <footer>
                <p>Don’t have an account? 
                    <Link to="/Notas/signup"><b> Sign up</b></Link>
                </p>            
            </footer>
        </>
    );
};

export default Login;
