import {useState, useEffect} from 'react';
import GerarCardSala from "./GerarCardSala.jsx";

export default function ReservaSala() {
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/espacos')
            .then(response => response.json())
            .then(data => setSalas(data))
            .catch(error => console.error('Erro ao obter dados:', error));
    }, []);

    const handleReserva = (sala, tipoReserva, docenteSiape, docenteMatricula, dataInicio, dataFim) => {
        const usuario_matricula = localStorage.getItem('usuario_matricula');
        const usuario_tipo = localStorage.getItem('usuario_tipo'); // Recupera o tipo do usuário


        // Verifica se o usuário é um 'diretor' antes de fazer uma reserva recorrente
        if (tipoReserva === 'recorrente' && usuario_tipo !== 'diretor') {
            alert('Usuário deve ser Diretor para fazer uma reserva recorrente');
            return;
        }

        const reserva = {
            tipo: tipoReserva,
            sala_id: sala.id,
            matricula_diretor: usuario_matricula,
            data_inicio: tipoReserva === 'recorrente' ? dataInicio : undefined,
            data_fim: tipoReserva === 'recorrente' ? dataFim : undefined,
            data: new Date().toISOString(),
            docente_siape: tipoReserva === 'recorrente' ? docenteSiape : undefined,
            docente_matricula: tipoReserva === 'recorrente' ? docenteMatricula : undefined
        }
        fetch(`http://localhost:3001/api/reservas/${tipoReserva}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(reserva)
        })
            .then(response => {
                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    return response.json().then(() => {
                        alert("Reserva efetuada com sucesso!");
                        setSalas(salas.map(s => {
                            if (s.id === sala.id) {
                                s.disponivel = false;
                            }
                            return s;
                        }));
                    });
                } else {
                    alert("Erro ao efetuar reserva!");
                }
            })
            .catch(error => console.error('Erro ao enviar dados:', error));
    };

    return (
        <section className="pt-5 mt-3 container">
            <h2 className='text-white mb-3'>Salas</h2>
            <div className="row g-5">
                {salas.map(sala => <GerarCardSala key={sala.id} sala={sala} handleReserva={handleReserva} />)}
            </div>
        </section>
    );
}