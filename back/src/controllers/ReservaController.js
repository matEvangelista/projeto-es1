const ReservaService = require('../services/ReservaService');
const ReservaRepository = require("../repository/ReservaRepository");

class ReservaController {
    constructor() {
        this.reservaService = new ReservaService();
        this.reservaRepository = new ReservaRepository();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getReservaById = this.getReservaById.bind(this);
        this.getAllByEspaco = this.getAllByEspaco.bind(this);
    }

    async getDadosFromView(req, res) {
        const tipo = req.params.tipo;
        try {
            const dados = await this.reservaRepository.getDadosFromView(tipo);
            res.json(dados);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao recuperar dados da view');
        }
    }

    async create(req, res) {
        console.log("entrei create ?", req.body)
        const dados = req.body;
        const tipo = req.params.tipo;
        try {
            const novaReserva = await this.reservaService.create(dados, tipo);
            res.json(novaReserva);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const updatedReservaData = req.body;
        const tipo = req.params.tipo;
        try {
            const reservaAtualizada = await this.reservaService.update(id, updatedReservaData, tipo);
            res.json(reservaAtualizada);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const tipo = req.params.tipo;
        try {
            await this.reservaService.delete(id, tipo);
            res.json({ message: 'Reserva deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        const tipo = req.params.tipo;
        try {
            const reservas = await this.reservaService.getAll(tipo);
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getReservaById(req, res) {
        const { id } = req.params;
        try {
            const reserva = await this.reservaService.getById(id);
            res.json(reserva);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllByEspaco(req, res) {
        console.log("entrei ?")
        const { idEspaco } = req.params;
        const tipo = req.params.tipo;
        try {
            const reservas = await this.reservaService.getAllByEspaco(idEspaco, tipo);
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReservaController();
