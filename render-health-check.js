/**
 * Script para mantener el bot activo en Render
 * Hace ping al endpoint /health cada 5 minutos
 */

const https = require('https');

const SERVICE_URL = process.env.RENDER_EXTERNAL_URL || 'https://exile-bot-0uvd.onrender.com';
const INTERVAL = 5 * 60 * 1000; // 5 minutos

function ping() {
    const url = `${SERVICE_URL}/health`;
    
    https.get(url, (res) => {
        console.log(`✅ Health check: ${res.statusCode} - ${new Date().toISOString()}`);
    }).on('error', (error) => {
        console.error(`❌ Health check error: ${error.message}`);
    });
}

// Ping inicial
ping();

// Ping periódico
setInterval(ping, INTERVAL);

console.log(`🏥 Health check iniciado - ping cada ${INTERVAL / 1000}s`);
