/**
 * Il cookie che porta un invito attraverso l'iscrizione.
 *
 * Sta in un file suo e non accanto alle azioni: un modulo "use server" può
 * esportare solo funzioni asincrone, quindi una costante lì dentro non
 * compila. E serve in due posti lontani — il middleware, che il cookie lo
 * scrive, e la pagina degli amici, che lo legge — che è esattamente il motivo
 * per cui il nome non va scritto a mano in nessuno dei due.
 */
export const COOKIE_INVITO = "invito";

/** La forma di un codice amico: otto caratteri, ma accettiamo largo. */
export const FORMA_CODICE = /^[A-Za-z0-9]{4,16}$/;
