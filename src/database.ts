import mysql from 'mysql2/promise';
import { normalizeEmail } from './utils';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getEmailsFromTables(): Promise<{ playerEmails: string[], blackListEmails: string[] }> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectTimeout: 30000, 
        connectionLimit: 10,
        queueLimit: 0
    });

    const [playerEmails] = await connection.query('SELECT email FROM Player WHERE player_state = "Active"');
    const [blackListEmails] = await connection.query('SELECT email FROM blackListEmails');

    await connection.end();
   
    const playerEmailsArr = (playerEmails as Array<{ email: string }>).map(row => normalizeEmail(row.email));
    const blackListEmailsArr = (blackListEmails as Array<{ email: string }>).map(row => normalizeEmail(row.email));
    
    return {
        playerEmails: playerEmailsArr,
        blackListEmails: blackListEmailsArr
    };
}
