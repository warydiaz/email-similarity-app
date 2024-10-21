import { checkEmailSimilarity } from './emailComparison';
import { sendEmail } from './emailService';

async function main(newEmail: string, recipientEmail: string) {
    const similarFound = await checkEmailSimilarity(newEmail);

    if (similarFound) {
        await sendEmail(recipientEmail, 'Email Similar Detectado', `Se ha encontrado un email similar al ingresado: ${newEmail}`);
    } else {
        console.log('No se encontró ningún email similar');
    }
}

// Ejemplo de uso
const newEmail = 'diaz@vistagaming.com'; // Email a comparar
const recipientEmail = 'adiaz@vistagaming.com'; // Email del destinatario

main(newEmail, recipientEmail).catch(console.error);
