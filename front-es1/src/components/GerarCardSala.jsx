import { useState } from 'react';
import { Link } from "react-router-dom";

export default function GerarCardSala({ sala, handleReserva }) {
    const [tipoReserva, setTipoReserva] = useState('automatica');
    const [docenteSiape, setDocenteSiape] = useState('');
    const [docenteMatricula, setDocenteMatricula] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{sala.nome}</h4>
                    <p className="card-text">{sala.recursos}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Localização: {sala.localizacao}</li>
                    <li className="list-group-item">Lotação: {sala.lotacao}</li>
                    <li className={`list-group-item text-white ${sala.disponivel ? "bg-success" : "bg-danger"}`}>{sala.disponivel ? "Disponível" : "Indisponível"}</li>
                </ul>
                <div className="card-body">
                    <select className="form-select mb-3" aria-label="Tipo de reserva" value={tipoReserva} onChange={e => setTipoReserva(e.target.value)}>
                        <option value="automatica">Automática</option>
                        <option value="sobAutorizacao">Sob Autorização</option>
                        <option value="recorrente">Recorrente</option>
                    </select>
                    {tipoReserva === 'recorrente' && (
                        <>
                            <input type="text" className="form-control mb-3" placeholder="Docente Siape" value={docenteSiape} onChange={e => setDocenteSiape(e.target.value)} />
                            <input type="text" className="form-control mb-3" placeholder="Docente Matricula" value={docenteMatricula} onChange={e => setDocenteMatricula(e.target.value)} />
                            <input type="date" className="form-control mb-3" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                            <input type="date" className="form-control mb-3" value={dataFim} onChange={e => setDataFim(e.target.value)} />
                        </>
                    )}
                    <button href="#" className="btn btn-primary" disabled={!sala.disponivel}
                            onClick={() => handleReserva(sala, tipoReserva, docenteSiape, docenteMatricula, dataInicio, dataFim)}
                    >Fazer reserva
                    </button>
                    <Link to={`/reservas/automatica/espaco/${sala.id}`} className="btn btn-secondary" style={{marginLeft: '10px'}}>Ver Reservas do Espaço</Link>
                </div>
            </div>
        </div>
    );
}