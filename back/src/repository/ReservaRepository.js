// repository/ReservaRepository.js
const ReservasAutomaticas = require('../models/ReservaAutomaticaModel');
const ReservasSobAutorizacao = require('../models/ReservaSobAutorizacaoModel');
const ReservasRecorrentes = require('../models/ReservaRecorrenteModel');
const Reserva = require('../models/ReservaModel');

class ReservaRepository {
    getModelByTipo(tipo) {
        switch (tipo) {
            case 'automatica':
                return ReservasAutomaticas;
            case 'sobAutorizacao':
                return ReservasSobAutorizacao;
            case 'recorrente':
                return ReservasRecorrentes;
            default:
                throw new Error('Tipo de reserva inválido');
        }
    }

    async getDadosFromView(tipo) {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '1234',
            database: process.env.DB_NAME || 'dados_es1'
        });

        let viewName;
        switch (tipo) {
            case 'automatica':
                viewName = 'reservas_automaticas';
                break;
            case 'sobAutorizacao':
                viewName = 'reservas_sob_autorizacao';
                break;
            case 'recorrente':
                viewName = 'reservas_recorrentes';
                break;
            default:
                throw new Error('Tipo de reserva inválido');
        }

        const [rows] = await connection.execute(`SELECT * FROM ${viewName}`);
        await connection.end();
        return rows;
    }

    async getAll(tipo) {
        const Model = this.getModelByTipo(tipo);
        return await Model.findAll();
    }

    async create(dados, tipo) {
        const Model = this.getModelByTipo(tipo);
        return Model.create(dados);
    }

    async update(id, updatedReservaData, tipo) {
        const Model = this.getModelByTipo(tipo);
        const reserva = await Model.findByPk(id);
        if (!reserva) {
            throw new Error('Reserva não encontrada');
        }
        return await reserva.update(updatedReservaData);
    }

    async delete(id, tipo) {
        const Model = this.getModelByTipo(tipo);
        const reserva = await Model.findByPk(id);
        if (!reserva) {
            throw new Error('Reserva não encontrada');
        }
        await reserva.destroy();
    }

    async getAllByEspaco(idEspaco) {
        // Buscar todas as reservas automáticas para a sala
        const reservasAutomaticas = await ReservasAutomaticas.findAll({ where: { sala_id: idEspaco } });

        // Buscar todas as reservas sob autorização para a sala
        const reservasSobAutorizacao = await ReservasSobAutorizacao.findAll({ where: { sala_id: idEspaco } });

        // Buscar todas as reservas recorrentes para a sala
        const reservasRecorrentes = await ReservasRecorrentes.findAll({ where: { sala_id: idEspaco } });

        // Combinar todos os resultados em um único array
        return [...reservasAutomaticas, ...reservasSobAutorizacao, ...reservasRecorrentes];
    }

    async getAllByUsuario(idUsuario, tipo) {
        const Model = this.getModelByTipo(tipo);
        return await Model.findAll({ where: { idUsuario: idUsuario } });
    }

    async getById(id, tipo) {
        const Model = this.getModelByTipo(tipo);
        return await Model.findByPk(id);
    }
}

module.exports = ReservaRepository;