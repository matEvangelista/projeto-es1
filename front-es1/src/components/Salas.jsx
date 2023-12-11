import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function ListaSalas() {
    const [salas, setSalas] = useState([]);

    const fetchSalas = () => {
        console.log('Obtendo lista de salas...')
        axios.get('http://localhost:3001/api/espacos')
            .then(response => {
                setSalas(response.data);
                console.log('res1', response.data)
            })
            .catch(error => {
                console.error('Erro ao obter salas:', error);
            });
    };

    useEffect(() => {
        fetchSalas();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/espacos/${id}`)
            .then(response => {
                console.log('res', response.data);
                fetchSalas(); // Atualiza a lista após a exclusão
            })
            .catch(error => {
                console.error('Erro ao deletar sala:', error);
            });
    };

    return (
        <div className="text-white" style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h2 style={{marginTop: '35px', marginBottom: '25px'}} className="text-center">Lista de Salas</h2>
            <Link to="/cadastroSala" className="btn btn-success mb-3">Adicionar
                Sala</Link>
            <div className="align-itens-center">
                <table style={{marginTop: '15px'}}>
                    <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Tipo</th>
                        <th className="text-center">Localização</th>
                        <th className="text-center">Disponivel</th>
                        <th className="text-center p-3">Descrição</th>
                        <th className="text-center p-3">Reservas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {salas.map(sala => (
                        <tr key={sala.id}>
                            <td className="text-center p-3">{sala.id}</td>
                            <td className="text-center p-3">{sala.nome}</td>
                            <td className="text-center p-3">{sala.tipo}</td>
                            <td className="text-center p-3">{sala.localizacao}</td>
                            <td className="text-center p-3">{sala.disponivel ? 'Sim' : 'Não'}</td>
                            <td className="text-center p-3">{sala.descricao}</td>
                            <td className="text-center p-3">
                                <Link to={`/reservas/automatica/espaco/${sala.id}`}>Ver Reservas</Link>
                            </td>
                            <td>
                                <Link to={`/salas/${sala.id}`} style={{marginRight: '5px'}}
                                      className="btn btn-primary">Editar</Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => {
                                    handleDelete(sala.id)
                                }}>Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}