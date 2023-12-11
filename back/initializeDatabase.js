const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'dados_es1'
    });

    // Verifique se a tabela 'usuario' existe
    const [rows] = await connection.execute("SHOW TABLES LIKE 'usuario'");
    if (rows.length === 0) {
        // Se a tabela 'usuario' não existir, assuma que o banco de dados precisa ser inicializado

        // Execute o script create-tables.sql
        const createTablesSql = fs.readFileSync('/home/operador/IdeaProjects/projeto-es1/create-tables.sql').toString();
        const statements = createTablesSql.split(';');

        for (const statement of statements) {
            if (statement.trim() !== '') {
                await connection.query(statement);
            }
        }

        //Execute o script insere.sql
        const insereSql = fs.readFileSync('/home/operador/IdeaProjects/projeto-es1/insere.sql').toString();
        const insereStatements = insereSql.split(';');

        for (const statement of insereStatements) {
            if (statement.trim() !== '') {
                await connection.query(statement);
            }
        }

        // Execute o script queries.sql
        const insertSql = fs.readFileSync('/home/operador/IdeaProjects/projeto-es1/queries.sql').toString();
        const insertStatements = insertSql.split(';');

        for (const statement of insertStatements) {
            if (statement.trim() !== '') {
                await connection.query(statement);
            }
        }
    }

    await connection.end();
}

initializeDatabase().catch(console.error);