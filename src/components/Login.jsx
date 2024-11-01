import { Link, useNavigate } from 'react-router-dom';
import '../styles/LogIn.css'; 
import google from '../storage/img/google.svg';
import apple from '../storage/img/Apple.svg';
import facebook from '../storage/img/Facebook.svg';
import logo from '../storage/img/star.svg';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent form default behavior
        navigate('/Notas/PaginaPrincipal');
    };

    return (
        <>
            <header>
                <div className="header__logo">
                    <img src={logo} alt="" />
                </div>
            </header>
            <main>
                <section className="section__form">
                    <h1>Log in</h1>
                    <form className="login">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" defaultValue="helloworld@gmail.com" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" defaultValue="123456789" />
                        <span>Forgot password?</span>
                        <button onClick={handleLogin} className="submit-button">Log in</button>
                    </form>
                </section>
                <section>
                    <div className="section__line">
                        <span>Or Login with</span>
                    </div>
                    <div className="section__social">
                        <button><img src={facebook} alt="Facebook" /></button>
                        <button><img src={google} alt="Google" /></button>
                        <button><img src={apple} alt="Apple" /></button>
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
