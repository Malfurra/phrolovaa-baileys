import { makeWASocket, DisconnectReason } from '../index.js';
import { Boom } from '@hapi/boom';

/**
 * Initializes the WhatsApp socket connection with auto-reconnect capabilities.
 * * @param {object} authState - The authentication state (e.g., from useMultiFileAuthState).
 * @param {function} saveCreds - Callback function to persist credentials upon updates.
 * @param {function} onMessage - Callback function to handle incoming messages.
 * @returns {Promise<object>} The initialized WhatsApp socket instance.
 */
export const startWhatsAppConnection = async (authState, saveCreds, onMessage) => {
    
    const sock = makeWASocket({
        auth: authState,
        printQRInTerminal: true,
        // Additional socket configurations can be defined here
    });

    // Listen for credential updates and persist them to storage
    sock.ev.on('creds.update', saveCreds);

    // Monitor network connection state updates
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const error = lastDisconnect?.error;
            const statusCode = (error instanceof Boom) ? error.output?.statusCode : error?.statusCode;
            
            // Determine if the disconnection warrants an automatic reconnect
            // We should not reconnect if the user explicitly logged out from their device
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            console.log(`[CONNECTION] Disconnected. Reason code: ${statusCode}. Attempting reconnect: ${shouldReconnect}`);

            if (shouldReconnect) {
                // Apply a brief delay before reconnecting to prevent server rate-limiting
                setTimeout(() => {
                    console.log('[CONNECTION] Attempting to reconnect...');
                    // Recursively re-initialize the connection
                    startWhatsAppConnection(authState, saveCreds, onMessage);
                }, 3000); 
            } else {
                console.log('[CONNECTION] Session logged out or invalidated. Please clear the session data and re-authenticate.');
                // Optional: Implement automated session directory cleanup logic here
            }
        } else if (connection === 'connecting') {
            console.log('[CONNECTION] Establishing connection...');
        } else if (connection === 'open') {
            console.log('[CONNECTION] Successfully connected to WhatsApp servers.');
        }
    });

    // Attach optional event listener for incoming messages
    if (onMessage) {
        sock.ev.on('messages.upsert', onMessage);
    }

    return sock;
};