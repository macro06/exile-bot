# 🏰 Exile Bot - Bot de Bienvenida Profesional

Bot de Discord profesional que genera imágenes de bienvenida personalizadas con temática medieval para nuevos miembros del servidor.

## ✨ Características

- 🖼️ **Imágenes personalizadas**: Genera automáticamente imágenes de bienvenida únicas
- 👤 **Avatar circular**: Muestra el avatar del usuario con bordes azul brillante
- 🎨 **Temática medieval**: Diseño épico con textos dorados y fondos personalizables
- 🪝 **Soporte webhook**: Envío por webhook o canal tradicional
- 🔧 **Comandos útiles**: Sistema de comandos integrado
- 📊 **Monitoreo**: Endpoints de estado y salud
- 🚀 **Optimizado**: Código limpio y profesional

## 🚀 Despliegue Rápido

### Render.com (Recomendado - Gratis)

1. **Fork este repositorio**
2. **Conecta con Render**: [render.com](https://render.com)
3. **Configura variables de entorno**:
   ```
   DISCORD_TOKEN=tu_token_del_bot
   WELCOME_CHANNEL_ID=id_del_canal
   DISCORD_WEBHOOK_URL=url_del_webhook (opcional)
   ```
4. **¡Despliega!**

## 🤖 Configuración del Bot Discord

### 1. Crear Aplicación
- Ve a [Discord Developer Portal](https://discord.com/developers/applications)
- **New Application** → Nombre: "Exile"
- **Bot** → **Add Bot**

### 2. Configurar Intents
Habilita estos intents obligatorios:
- ✅ **Server Members Intent**
- ✅ **Message Content Intent**

### 3. Invitar al Servidor
Usa esta URL (reemplaza CLIENT_ID):
```
https://discord.com/api/oauth2/authorize?client_id=TU_CLIENT_ID&permissions=8&scope=bot
```

## 🎮 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `!test-welcome` | Genera imagen de prueba |
| `!exile-status` | Muestra estado del bot |

## 🎨 Personalización

### Imagen de Fondo
- Coloca tu imagen en `assets/background.jpg` (800x400px recomendado)
- Si no hay imagen, usa gradiente por defecto

### Fuente Medieval
- Agrega fuente personalizada en `assets/medieval-font.ttf`
- Fallback automático a fuentes del sistema

### Colores y Textos
Edita estas variables en `index.js`:
```javascript
const welcomeText = '¡BIENVENIDO AL EXILIO!';  // Texto principal
ctx.fillStyle = '#FFD700';  // Color dorado
ctx.fillStyle = '#00BFFF';  // Borde azul brillante
```

## 📊 Monitoreo

### Endpoints Disponibles
- `GET /` - Estado general del bot
- `GET /health` - Verificación de salud

### Ejemplo de respuesta:
```json
{
  "name": "Exile Bot",
  "status": "online",
  "uptime": 3600,
  "guilds": 1,
  "users": 150,
  "connected": true
}
```

## 🛠️ Desarrollo Local

### Requisitos
- Node.js 18+
- NPM 8+

### Instalación
```bash
git clone https://github.com/macro06/exile-bot.git
cd exile-bot
npm install
cp .env.example .env
# Edita .env con tus tokens
npm start
```

## 📁 Estructura del Proyecto

```
exile-bot/
├── index.js              # Código principal del bot
├── package.json           # Dependencias y scripts
├── render.yaml           # Configuración de Render
├── .env.example          # Plantilla de variables
├── assets/               # Recursos opcionales
│   ├── background.jpg    # Imagen de fondo personalizada
│   └── medieval-font.ttf # Fuente medieval personalizada
└── README.md            # Documentación
```

## 🔧 Solución de Problemas

### ⚠️ Bot se desconecta en Render (Plan Free)

**Problema común**: El plan gratuito de Render duerme el servicio después de 15 minutos de inactividad.

**Solución recomendada**: Usa [UptimeRobot](https://uptimerobot.com/) (gratis)
1. Crea una cuenta en UptimeRobot
2. Añade un monitor HTTP(s) con tu URL: `https://tu-bot.onrender.com/health`
3. Configura intervalo de 5 minutos
4. ¡Listo! Tu bot se mantendrá activo 24/7

Ver [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) para más detalles.

### Bot no se conecta
1. Verifica que el token sea correcto
2. Confirma que los Intents estén habilitados
3. Revisa los logs del servidor

### Imágenes no se generan
1. Verifica que Canvas esté instalado correctamente
2. Confirma que el canal de bienvenida exista
3. Revisa permisos del bot

### Webhook no funciona
1. Verifica que la URL del webhook sea válida
2. El bot fallback automáticamente al canal

## 📝 Licencia

MIT License - Libre para usar, modificar y distribuir.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/macro06/exile-bot/issues)
- 💬 **Discord**: Únete a nuestro servidor de soporte

---

**¡Que comience el exilio!** ⚔️🏰