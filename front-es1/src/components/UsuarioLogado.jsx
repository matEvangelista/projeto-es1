import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function UsuarioLogado() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsuario(decodedToken.usuario);
        }
    }, []);

    if (!usuario) {
        return <div>Você não está logado</div>;
    }

    return (
        <div className='text-white mb-3' style={{ position: 'absolute', top: 0, right: 0 }}>
            <h2 className="pt-2">Bem-vindo, {usuario.nome}!</h2>
            <p className="p-2">Sua role é: {usuario.tipo}</p>
        </div>
    );
}