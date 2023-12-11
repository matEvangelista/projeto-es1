const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserService = require("../services/UserService"); // Certifique-se de que jwt está importado

class UserController {
    constructor() {
        this.userService = new UserService();
        this.register = this.register.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.login = this.login.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        try {
            const novoUsuario = await this.userService.createUser(req.body);
            res.json(novoUsuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async getAll(req, res) {
        try {
            const usuarios = await this.userService.getAllUsers();
            res.json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async getProfile(req, res) {
        res.json(req.usuario); // Retorna as informações do usuário extraídas do token
    }

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const usuario = await this.userService.getUserByCredentials(email, senha);

            if (!usuario) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ usuario: { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo, matricula: usuario.matricula } }, process.env.SECRET_KEY);
            res.json({ token, usuario });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    async deleteUser(req, res) {
        try {
            await this.userService.deleteUser(req.params.matricula);
            res.status(204).end();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

const userController = new UserController();
module.exports = userController;
