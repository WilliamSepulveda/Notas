import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import starLogo from '../storage/img/Star.svg';

const SignUp = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent form default behavior

        // Validación básica
        if (!userName || !email || !password) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              });

            const data = await response.json();

            if (response.ok) {
                // Si la creación fue exitosa, redirigir al usuario
                navigate('/Notas/Login');
            } else {
                // Manejar errores devueltos por el servidor
                setErrorMessage(data.message || 'Error al crear la cuenta.');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setErrorMessage('Error durante la creación de la cuenta.');
        }
    };

    return (
        <>
            <header>
                <div className="header__logo">
                    <img src={starLogo} alt="Logo" />
                </div>
            </header>
            <main>
                <section className="section__form">
                    <h1>Create account</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form onSubmit={handleSignUp} className="login">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Your username" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required 
                        />
                        
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        
                        <span>
                            I accept the terms and privacy policy
                        </span>
                        
                        <input type="submit" className="submit-button" value="Sign up" />
                    </form>
                </section>
            </main>
            <footer>
                <p>Don’t have an account? <b>Sign up</b></p>
            </footer>
        </>
    );
};

export default SignUp;
