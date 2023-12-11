import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ReservasPorSala() {
    const [reservas, setReservas] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/api/reservas/automatica/espaco/${id}`)
            .then(response => response.json())
            .then(data => setReservas(data))
            .catch(error => console.error('Erro ao obter dados:', error));
    }, [id]);

    return (
        <div className="text-white" style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h2 style={{marginTop: '35px', marginBottom: '25px'}} className="text-center">Reservas da Sala {id}</h2>
            <div className="align-itens-center">
                <table style={{marginTop: '15px'}}>
                    <thead>
                    <tr>
                        <th className="text-center">ID Reserva</th>
                        <th className="text-center">Data</th>
                        <th className="text-center">Usuário</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva.id}>
                            <td className="text-center p-3">{reserva.id}</td>
                            <td className="text-center p-3">{reserva.data}</td>
                            <td className="text-center p-3">{reserva.usuario}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}