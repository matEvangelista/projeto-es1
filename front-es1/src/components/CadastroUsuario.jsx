import axios from "axios";
import {useState} from "react";

export default function CadastroUsuario() {
    const [user, setUser] = useState({
        nome: '',
        email: '',
        tipo: '',
        matricula: '',
        senha: '',
        telefone: '',
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        console.log(user)
        e.preventDefault();
        axios.post('http://localhost:3001/api/register', user)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error);
            });
    };
    return (
        <section className="container text-white py-3">
            <h2 className="mt-5">Cadastro de Usuários</h2>
            <form onSubmit={ handleSubmit }>
                <div className="inputs mt-3">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="nome" className="form-label">Nome do usuário</label>
                            <input type="text" className="form-control" id="nome" placeholder="Jobson da Silva" onChange={ handleChange } />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input type="email" className="form-control" id="email" placeholder="jobson@gmail.com" onChange={ handleChange } />
                        </div>
                        <div className="col-md-4 mt-3 mt-md-auto">
                            <select className="form-select" aria-label="tipo" id="tipo" onChange={ handleChange }>
                                <option selected>Tipo de usuário</option>
                                <option value="discente">Discente</option>
                                <option value="docente">Docente</option>
                                <option value="diretor">Diretor</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="matricula" className="form-label">Matrícula</label>
                            <input type="text" className="form-control" id="matricula" placeholder="2023123..." onChange={ handleChange } />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="senha" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="senha" placeholder="Sua senha aqui" onChange={ handleChange } />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input type="tel" className="form-control" id="telefone" placeholder="2199999999" onChange={ handleChange } />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <input type="submit" value="Cadastrar" className="btn btn-primary col-md-2 col-6 m-auto" onChange={ handleChange } />
                    </div>
                </div>
            </form>
        </section>
    )
}