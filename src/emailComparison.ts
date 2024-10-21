import { getEmailsFromTables } from './database';
import { normalizeEmail, levenshtein } from './utils';

export async function checkEmailSimilarity(newEmail: string, threshold: number = 3): Promise<boolean> {
    const { playerEmails, blackListEmails } = await getEmailsFromTables();
    const normalizedNewEmail = normalizeEmail(newEmail);

    // Comparar con la tabla Player
    for (const email of playerEmails) {
        if (isSimilar(normalizedNewEmail, email, threshold)) {
            console.log(`Email similar encontrado en Player: ${email}`);
            return true;
        }
    }

    // Comparar con la tabla blackListEmails
    for (const email of blackListEmails) {
        if (isSimilar(normalizedNewEmail, email, threshold)) {
            console.log(`Email similar encontrado en blackListEmails: ${email}`);
            return true;
        }
    }

    return false;
}

function isSimilar(email1: string, email2: string, threshold: number): boolean {
    const distance = levenshtein(email1, email2);
    return distance <= threshold;
}
