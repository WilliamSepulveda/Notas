// EntrarUsuario.jsx
import '../styles/EntrarUsuario.css';
import start from '../storage/img/Illustration.svg'

const EntrarUsuario = () => {
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
                <a href="./views/log-In-1.html">Sign In</a>
                <a href="./views/sign-Up-3.html">Create account</a>
            </section>
        </main>
    );
};

export default EntrarUsuario;
