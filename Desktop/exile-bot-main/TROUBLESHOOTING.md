# 🔧 Solución de Problemas - Exile Bot

## Bot se desconecta en Render

### Causas comunes:

1. **Plan Free de Render se duerme** - Después de 15 minutos de inactividad
2. **Errores no manejados** - Causan que el proceso se detenga
3. **Problemas de red** - Discord puede desconectar temporalmente
4. **Token inválido** - Discord revoca el token si hay problemas

### Soluciones aplicadas:

✅ **Manejo mejorado de errores** - El bot no se detendrá por errores menores
✅ **Reconexión automática** - Discord.js reconectará automáticamente
✅ **Health check endpoint** - Render puede verificar que el bot esté vivo
✅ **Node.js 20.x** - Versión actualizada y con soporte
✅ **Eventos de shard** - Mejor logging de desconexiones

### Pasos para mantener el bot activo:

#### Opción 1: Usar un servicio de ping externo (RECOMENDADO)

1. Ve a [UptimeRobot](https://uptimerobot.com/) (gratis)
2. Crea una cuenta
3. Añade un nuevo monitor:
   - Type: HTTP(s)
   - URL: `https://exile-bot-0uvd.onrender.com/health`
   - Monitoring Interval: 5 minutos
4. Esto hará ping a tu bot cada 5 minutos y lo mantendrá activo

#### Opción 2: Actualizar a plan de pago en Render

El plan de $7/mes mantiene el servicio activo 24/7 sin dormirse.

#### Opción 3: Usar otro hosting

- **Railway** - $5/mes, más estable
- **Fly.io** - Plan gratuito más generoso
- **VPS** (DigitalOcean, Linode) - Desde $4/mes

### Verificar que el bot esté funcionando:

```bash
# Verificar estado
curl https://exile-bot-0uvd.onrender.com/health

# Debería responder:
{
  "status": "healthy",
  "guilds": 1,
  "uptime": 123.45,
  "memory": {...},
  "timestamp": "2026-02-06T..."
}
```

### Verificar logs en Render:

1. Ve a tu dashboard de Render
2. Selecciona el servicio "exile-bot"
3. Click en "Logs"
4. Busca errores o desconexiones

### Verificar configuración de Discord:

1. Ve al [Discord Developer Portal](https://discord.com/developers/applications)
2. Selecciona tu aplicación
3. Ve a "Bot"
4. Verifica que estos intents estén habilitados:
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT
5. Si regeneraste el token, actualiza la variable `DISCORD_TOKEN` en Render

### Comandos útiles:

- `!exile-status` - Ver estado del bot
- `!test-welcome` - Probar imagen de bienvenida

### Si el problema persiste:

1. Revisa los logs completos en Render
2. Verifica que las variables de entorno estén configuradas
3. Asegúrate de que el token sea válido
4. Considera usar UptimeRobot para mantenerlo activo
