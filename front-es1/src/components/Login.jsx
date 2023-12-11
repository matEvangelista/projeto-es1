import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        })
            .then(response => {
                console.log('Resposta recebida:', response);
                return response.json();
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token); // armazena o token
                    localStorage.setItem('usuario_matricula', data.usuario.matricula); // armazena a matrícula do usuário
                    localStorage.setItem('usuario_tipo', data.usuario.tipo); // armazena a matrícula do usuário
                    console.log('Usuário autenticado com sucesso:', data);
                    history('/'); // Redireciona para a página inicial
                } else {
                    console.error('Erro ao autenticar usuário:', data);
                    alert('Erro ao autenticar usuário'); // Mostra um alerta
                    setSenha(''); // Limpa a senha
                }
            })
            .catch(error => {
                console.error('Erro ao enviar dados:', error);
                alert('Erro ao enviar dados'); // Mostra um alerta
                setSenha(''); // Limpa a senha
            });
    };

    return (
        <section className="pt-5 mt-3 container">
            <h2 className='text-white mb-3'>Faça seu login</h2>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="emailLogin" placeholder="Digite seu email aqui..."
                                   value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="emailLogin">Email</label>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="senhaLogin" placeholder="Password"
                                   value={senha} onChange={e => setSenha(e.target.value)} />
                            <label htmlFor="senhaLogin">Password</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <input type="submit" value="Login" className="btn btn-primary col-md-2 col-6 m-auto" />
                </div>
            </form>
        </section>
    );
}