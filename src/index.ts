import { checkEmailSimilarity } from './emailComparison';
import { sendEmail } from './emailService';

async function main(newEmail: string) {
    const similarFound = await checkEmailSimilarity(newEmail);

    if (similarFound) {
        await sendEmail('Similar Email Detected', `A similar email to the one entered has been found ${newEmail}`);
    }
}

// Ejemplo de uso
const newEmail = 'diaz@vistagaming.com'; // Email a comparar

main(newEmail).catch(console.error);
