import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import starLogo from '../storage/img/Star.svg';

const SignUp = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent form default behavior
        navigate('/Notas/PaginaPrincipal');
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
                    <form onSubmit={handleLogin} method="post" className="login">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Your username" required />
                        
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Your email" required />
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Your password" required />
                        
                        <span>
                            I accept the terms and privacy policy
                        </span>
                        
                        {/* Change the input type to submit */}
                        <input type="submit" className="submit-button" value="Log in" />
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
    