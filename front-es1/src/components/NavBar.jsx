import {Link, useNavigate} from "react-router-dom"
import UsuarioLogado from "./UsuarioLogado.jsx";

export default function NavBar() {
    const token = localStorage.getItem('token');
    const history = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/'); // Redireciona para a página inicial
    }

    return (
        <nav className="navbar bg-dark border-bottom border-body fixed-top navbar-expand-lg" data-bs-theme="dark">
            <div className="container">
                <Link to={'/'} className={"navbar-brand"}>Sistema</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {token && (
                            <>
                                <li className="nav-item m-auto">
                                    <Link className="nav-link" to={'reservaSalas'}>Reserva de salas</Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link className="nav-link" to={'gestaoReservas'}>Gestão de reservas</Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link to={'cadastroSala'} className="nav-link">Cadastrar sala</Link>
                                </li>
                                <li className="nav-item m-auto">
                                    <Link to={'usuarios'} className="nav-link">Usuarios</Link>
                                </li>
                                <li className="nav-item m-auto ms-lg-4">
                                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                                </li>
                            </>
                        )}
                        {!token && (
                            <li className="nav-item m-auto ms-lg-4">
                                <Link to={'login'} className="btn btn-primary">Login</Link>
                            </li>
                        )}
                    </ul>
                    {token && <UsuarioLogado />}
                </div>
            </div>
        </nav>
    )
}