import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

export default function GestaoReservas() {

    const [dataASerAprovado, setDataASerAprovado] = useState([]);

    const [dataAutomatica, setdataAutomatica] = useState([]);

    const [dataRecorrentes, setDataRecorrentes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/reservas/sobAutorizacao')
            .then(response => response.json())
            .then(dataASerAprovado => setDataASerAprovado(dataASerAprovado))
            .then(console.log(dataASerAprovado))
            .catch(error => console.error('Erro ao obter dados:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/reservas/automatica')
            .then(response => response.json())
            .then(dataAutomatica => setdataAutomatica(dataAutomatica))
            .then(console.log(dataAutomatica))
            .catch(error => console.error('Erro ao obter dados:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/reservas/recorrente')
            .then(response => response.json())
            .then(dataRecorrentes => setDataRecorrentes(dataRecorrentes))
            .then(console.log(dataRecorrentes))
            .catch(error => console.error('Erro ao obter dados:', error));
    }, []);

    function gerarCardSalaASerAprovada(sala, index) {
        return (
            <div className={`col-md-6 ${sala.em_analise == 0 ? 'd-none' : ''}`}>
                <div className={`card`}>
                    <div className="card-body">
                        <h4 className="card-title">{sala.nome_sala}</h4>
                        <p className="card-text">Recursos: {sala.recursos}. Objetivo da reserva: {sala.descricao}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Localização: {sala.localizacao}
                        </li>
                        <li className="list-group-item">
                            Lotação: {sala.lotacao}
                        </li>
                        <li className="list-group-item">
                            Nome do discente: {sala.nome}
                        </li>
                    </ul>
                    <div className="card-body">
                        <form action="">
                            <div className="inputs">
                                <div class="mb-3">
                                    <label
                                        for={`justificativa_${index}`}
                                        class="form-label"
                                    >
                                        Justificativa
                                    </label>
                                    <textarea
                                        class="form-control"
                                        id={`justificativa_${index}`}
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-body d-flex">
                        <button href="#" className="btn btn-success">
                            Aprovar reserva
                        </button>
                        <button
                            className="btn btn-danger ms-auto"
                        >
                            Negar reserva
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function gerarCardReservaAutomatica(sala) {
        return (
            <div className={`col-md-6`}>
                <div className={`card`}>
                    <div className="card-body">
                        <h4 className="card-title">{sala.nome_sala}</h4>
                        <p className="card-text">{sala.recursos}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Localização: {sala.localizacao}
                        </li>
                        <li className="list-group-item">
                            Lotação: {sala.lotacao}
                        </li>
                        <li className="list-group-item">
                            Nome do usuario: {sala.nome}
                        </li>
                        <li className="list-group-item">
                            Dias da semana: {`${sala.dia_semana_1}, ${sala.dia_semana_2}, ${sala.dia_semana_3}`}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    function gerarCardReservaRecorrente(sala) {
        return (
            <div className={`col-md-6`}>
                <div className={`card`}>
                    <div className="card-body">
                        <h4 className="card-title">{sala.nome_sala}</h4>
                        <p className="card-text">Objetivo da reserva: {sala.descricao}</p>
                        <p className="card-text">Docente: {sala.nome_docente}, email: {sala.email_docente}</p>
                        <p className="card-text">Diretor: {sala.nome_diretor}, email: {sala.email_diretor}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Localização: {sala.localizacao}
                        </li>
                        <li className="list-group-item">
                            Lotação: {sala.lotacao}
                        </li>
                        <li className="list-group-item">
                            Nome do usuario: {sala.nome}
                        </li>
                        <li className="list-group-item">
                            Dias da semana: {`${sala.dia_semana_1}, ${sala.dia_semana_2}, ${sala.dia_semana_3}`}
                        </li>
                        <li className="list-group-item">
                            Período: {`de ${sala.data_inicio} a ${sala.data_fim}`}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    
    function geraCardReservaAprovada(sala) {
        return (
            <div className={`col-md-6 ${sala.em_analise == 1 ? 'd-none' : ''}`}>
                <div className={`card`}>
                    <div className="card-body">
                        <h4 className="card-title">{sala.nome_sala}</h4>
                        <p className="card-text">Objetivo da reserva: {sala.descricao}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Localização: {sala.localizacao}
                        </li>
                        <li className="list-group-item">
                            Lotação: {sala.lotacao}
                        </li>
                        <li className="list-group-item">
                            Nome do discente: {sala.nome}
                        </li>
                        <li className="list-group-item">
                            Nome do administrador: {sala.nome_adm}
                        </li>
                        <li className="list-group-item">
                            Data: {sala.data}
                        </li>
                        <li className="list-group-item">Justificativa: {sala.justificativa}</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="pt-5 mt-3 container">
                <h2 className="text-white mb-3">Salas a serem aprovadas</h2>
                <div className="row g-5">{dataASerAprovado.map(gerarCardSalaASerAprovada)}</div>
            </section>
            <section className="pt-5 mt-3 container">
                <h2 className="text-white mb-3">Salas sendo utilizadas</h2>
                <h3 className="text-white mb-3">Reservas automáticas</h3>
                <div className="row g-5">
                    {dataAutomatica.map(gerarCardReservaAutomatica)}
                </div>
                <h3 className="text-white mb-3">Reservas recorrentes</h3>
                <div className="row g-5">
                    {dataRecorrentes.map(gerarCardReservaRecorrente)}
                </div>
                <h3 className="text-white mb-3">Reservas sob autorização aprovadas</h3>
                <div className="row g-5">
                    {dataASerAprovado.map(geraCardReservaAprovada)}
                </div>
            </section>
        </>
    );
}
