/**
 * Exile Bot - Bot de Bienvenida Profesional para Discord
 * Genera imágenes personalizadas de bienvenida con temática medieval
 */

const { Client, GatewayIntentBits, AttachmentBuilder, WebhookClient, ActivityType } = require('discord.js');
const Canvas = require('canvas');
const express = require('express');
require('dotenv').config();

// Configuración del cliente Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


/**
 * Crea un fondo por defecto con gradiente medieval
 */
function createDefaultBackground(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Textura de piedra simulada
    ctx.fillStyle = 'rgba(139, 69, 19, 0.1)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3 + 1;
        ctx.fillRect(x, y, size, size);
    }
}

/**
 * Genera imagen de bienvenida personalizada
 */
async function createWelcomeImage(member) {
    const canvas = Canvas.createCanvas(800, 400);
    const ctx = canvas.getContext('2d');

    // Cargar imagen de fondo o usar por defecto
    try {
        const background = await Canvas.loadImage('./assets/background.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    } catch (error) {
        console.log('📸 Usando fondo por defecto');
        createDefaultBackground(ctx, canvas.width, canvas.height);
    }

    // Overlay para mejor legibilidad
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Configuración del avatar
    const avatarSize = 120;
    const avatarX = canvas.width / 2;
    const avatarY = 150;

    // Borde del avatar (azul brillante)
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarSize / 2 + 5, 0, Math.PI * 2, true);
    ctx.fillStyle = '#00BFFF';
    ctx.fill();
    ctx.closePath();

    // Círculo para el avatar
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2, true);
    ctx.clip();

    // Avatar del usuario
    const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({ extension: 'jpg', size: 256 })
    );
    ctx.drawImage(avatar, avatarX - avatarSize / 2, avatarY - avatarSize / 2, avatarSize, avatarSize);
    ctx.restore();

    // Configurar fuente
    try {
        Canvas.registerFont('./assets/medieval-font.ttf', { family: 'Medieval' });
        ctx.font = 'bold 36px Medieval, serif';
    } catch (error) {
        ctx.font = 'bold 36px "Times New Roman", serif';
    }

    // Texto principal
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    
    const welcomeText = '¡BIENVENIDO AL EXILIO!';
    ctx.strokeText(welcomeText, canvas.width / 2, 80);
    ctx.fillText(welcomeText, canvas.width / 2, 80);

    // Nombre del usuario
    try {
        ctx.font = 'bold 28px Medieval, serif';
    } catch (error) {
        ctx.font = 'bold 28px "Times New Roman", serif';
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    
    ctx.strokeText(member.user.username, canvas.width / 2, 300);
    ctx.fillText(member.user.username, canvas.width / 2, 300);

    // Subtítulo
    try {
        ctx.font = '20px Medieval, serif';
    } catch (error) {
        ctx.font = '20px "Times New Roman", serif';
    }
    ctx.fillStyle = '#CCCCCC';
    ctx.fillText('Que tu destino se forje en estas tierras', canvas.width / 2, 340);

    return canvas.toBuffer();
}

/**
 * Envía mensaje de bienvenida por webhook o canal
 */
async function sendWelcomeMessage(member, welcomeImage) {
    const attachment = new AttachmentBuilder(welcomeImage, { name: 'welcome.png' });
    const welcomeMessage = {
        content: `🏰 **${member.user.username}** ha llegado al exilio... ¡Que comience tu aventura! 🗡️`,
        files: [attachment]
    };

    // Intentar webhook primero
    if (webhookClient) {
        try {
            await webhookClient.send({
                ...welcomeMessage,
                username: 'Exile',
                avatarURL: 'https://cdn.discordapp.com/emojis/123456789.png'
            });
            console.log(`✅ Bienvenida enviada por webhook: ${member.user.username}`);
            return true;
        } catch (error) {
            console.warn('⚠️ Error en webhook, usando canal:', error.message);
        }
    }

    // Canal tradicional
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(welcomeChannelId);
    
    if (!channel) {
        console.error('❌ Canal de bienvenida no encontrado');
        return false;
    }

    await channel.send(welcomeMessage);
    console.log(`✅ Bienvenida enviada por canal: ${member.user.username}`);
    return true;
}

// Eventos del bot
client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} conectado exitosamente`);
    console.log(`📊 Activo en ${client.guilds.cache.size} servidor(es)`);
    
    // Estado del bot
    client.user.setActivity('Vigilando el exilio', { type: ActivityType.Watching });
    
    // Mantener activo (cada 5 minutos)
    setInterval(() => {
        console.log(`🔄 Bot activo - ${new Date().toISOString()}`);
    }, 300000);
});

// Reconexión automática
client.on('shardError', error => {
    console.error('❌ Error de WebSocket:', error);
});

client.on('shardDisconnect', (event, shardId) => {
    console.warn(`⚠️ Shard ${shardId} desconectado:`, event);
});

client.on('shardReconnecting', shardId => {
    console.log(`🔄 Shard ${shardId} reconectando...`);
});

client.on('shardResume', (shardId, replayedEvents) => {
    console.log(`✅ Shard ${shardId} reconectado (${replayedEvents} eventos)`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`👤 Nuevo miembro: ${member.user.username} en ${member.guild.name}`);
        
        const welcomeImage = await createWelcomeImage(member);
        await sendWelcomeMessage(member, welcomeImage);
        
    } catch (error) {
        console.error('❌ Error procesando bienvenida:', error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Comando de prueba
    if (message.content === '!test-welcome') {
        try {
            const welcomeImage = await createWelcomeImage(message.member);
            const attachment = new AttachmentBuilder(welcomeImage, { name: 'test-welcome.png' });
            
            await message.reply({
                content: '🧪 **Prueba de imagen de bienvenida:**',
                files: [attachment]
            });
        } catch (error) {
            await message.reply(`❌ Error: ${error.message}`);
        }
    }

    // Comando de estado
    if (message.content === '!exile-status') {
        const embed = {
            color: 0x00BFFF,
            title: '🏰 Estado del Bot Exile',
            fields: [
                { name: '📊 Servidores', value: client.guilds.cache.size.toString(), inline: true },
                { name: '👥 Usuarios', value: client.users.cache.size.toString(), inline: true },
                { name: '⏱️ Uptime', value: `${Math.floor(process.uptime() / 60)} minutos`, inline: true },
                { name: '🔗 Webhook', value: webhookClient ? 'Configurado' : 'No configurado', inline: true }
            ],
            timestamp: new Date(),
            footer: { text: 'Exile Bot - Sistema de Bienvenida' }
        };
        
        await message.reply({ embeds: [embed] });
    }
});

// Manejo de errores mejorado
client.on('error', error => {
    console.error('❌ Error del cliente:', error);
    // No salir del proceso, dejar que Discord.js maneje la reconexión
});

client.on('warn', warning => {
    console.warn('⚠️ Advertencia:', warning);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
    console.error('❌ Promesa rechazada no manejada:', error);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Excepción no capturada:', error);
    // En producción, es mejor registrar y continuar
});

// Servidor HTTP para Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        name: 'Exile Bot',
        status: 'online',
        uptime: Math.floor(process.uptime()),
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        connected: client.isReady(),
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    const isHealthy = client.isReady();
    res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'healthy' : 'disconnected',
        guilds: client.guilds.cache.size,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

// Endpoint para mantener vivo (Render puede hacer ping aquí)
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(PORT, () => {
    console.log(`🌐 Servidor HTTP activo en puerto ${PORT}`);
});

// Inicializar bot
console.log('🚀 Iniciando Exile Bot...');
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log('✅ Autenticación exitosa'))
    .catch(error => {
        console.error('❌ Error de autenticación:', error.message);
        process.exit(1);
    });

