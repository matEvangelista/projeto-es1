import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="container-fluid hero">
            <div className="hero-text">
                <h1>Alocação de Espaços</h1>
                {/*frase de boas vindas ao projeto*/}
                <p> </p>
                <Link to='/login' className='btn btn-primary'>Login</Link>
                <Link to='/cadastroUsuario' className='btn btn-success' style={{marginLeft:5}}>Cadastre-se</Link>
            </div>
        </section>
    )
}