import React, {useState} from 'react';

export default function CadastroSala() {
    const [espaco, setEspaco] = useState({
        nome: '',
        recursos: '',
        tipo: '',
        lotacao: '',
        localizacao: '',
        tipoReserva: ''
    });

    const handleChange = (event) => {
        setEspaco({
            ...espaco,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/espacos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(espaco)
            });
            if (!response.ok) {
                throw new Error('Erro ao criar a sala');
            }
            //mensagem de sucesso, sem precisar clicar para fechar
            alert('Sala criada com sucesso!');
        } catch (error) {
            alert(error.message);
        } finally {
            //leva para a pagina inicial
            window.location.href = '/salas';
        }
    };

    return (
        <section className="container text-white pb-3">
            <h2 className="mt-5">Cadastro de Salas</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputs mt-3">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="nomeSala" className="form-label">Nome da sala</label>
                            <input type="text" className="form-control" id="nome" placeholder="Sala 101"
                                   onChange={handleChange}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="recursos" className="form-label">Recursos</label>
                            <input type="text" className="form-control" id="recursos"
                                   placeholder="Quadro digital, televisão..." onChange={handleChange}/>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-auto">
                            <select className="form-select" aria-label="tipoSala" id="tipo" onChange={handleChange}>
                                <option selected>Tipo de sala</option>
                                <option value="aud">Auditório</option>
                                <option value="sala">Sala de aula</option>
                                <option value="lab">Laboratório</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="lotacao" className="form-label">Lotação</label>
                            <input type="number" className="form-control" id="lotacao" placeholder="Número inteiro"
                                   min={0} onChange={handleChange}/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="localizacao" className="form-label">Localização</label>
                            <input type="text" className="form-control" id="localizacao"
                                   placeholder="Prédio tal daquele campus" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-sm-2 mt-4 mx-auto">
                        <select className="form-select" aria-label="disponivel" id="disponivel"
                                onChange={handleChange}>
                            <option selected>Disponibilidade</option>
                            <option value="1">Disponível</option>
                            <option value="2">Indisponível</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 align-end">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <textarea className="form-control" id="descricao" rows="3" onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <input type="submit" value="Cadastrar" className="btn btn-primary col-md-2 col-6 m-auto"/>
                    </div>
                </div>
            </form>
        </section>
    )
}