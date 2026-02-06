# 🎨 Desplegar Bot Exile en Render.com - Guía Completa

## 🎯 ¿Por qué Render?
- ✅ **100% GRATIS** - 750 horas/mes (suficiente para 24/7)
- ✅ **Fácil de usar** - Similar a Heroku
- ✅ **Despliegue automático** desde GitHub
- ✅ **Sin tarjeta de crédito** requerida

---

## 📋 PASO 1: Preparar tu código

### 1.1 Crear repositorio en GitHub
```bash
# En tu carpeta del bot
git init
git add .
git commit -m "Bot Exile inicial"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU-USUARIO/exile-bot.git
git branch -M main
git push -u origin main
```

### 1.2 Verificar archivos importantes
Asegúrate de tener estos archivos:
- ✅ `package.json` (con engines especificados)
- ✅ `index.js` (código del bot)
- ✅ `render.yaml` (configuración de Render)
- ✅ `.env.example` (plantilla de variables)

---

## 🤖 PASO 2: Configurar el Bot de Discord

### 2.1 Crear aplicación en Discord
1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Clic en **"New Application"**
3. Nombre: **"Exile"**
4. Clic **"Create"**

### 2.2 Crear el bot
1. Ve a la pestaña **"Bot"** (menú izquierdo)
2. Clic **"Add Bot"**
3. Confirma **"Yes, do it!"**

### 2.3 Configurar permisos del bot
1. En la sección **"Privileged Gateway Intents"**:
   - ✅ **Server Members Intent** (IMPORTANTE)
   - ✅ **Message Content Intent** (IMPORTANTE)
2. Clic **"Save Changes"**

### 2.4 Copiar el token
1. En la sección **"Token"**
2. Clic **"Copy"** (guárdalo, lo necesitarás)
3. **¡NUNCA compartas este token!**

### 2.5 Invitar el bot a tu servidor
1. Ve a **"OAuth2"** → **"URL Generator"**
2. **Scopes**: Marca `bot`
3. **Bot Permissions**: Marca:
   - ✅ Send Messages
   - ✅ Attach Files
   - ✅ Read Message History
   - ✅ View Channels
4. Copia la URL generada
5. Pégala en tu navegador e invita el bot

---

## 🌐 PASO 3: Desplegar en Render

### 3.1 Crear cuenta en Render
1. Ve a [render.com](https://render.com)
2. Clic **"Get Started for Free"**
3. Regístrate con GitHub (recomendado)

### 3.2 Crear nuevo servicio
1. En el dashboard, clic **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona tu repositorio **"exile-bot"**

### 3.3 Configurar el servicio
**Configuración básica:**
- **Name**: `exile-bot`
- **Region**: `Oregon (US West)` (más cercano)
- **Branch**: `main`
- **Runtime**: `Node`

**Configuración de build:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Plan:**
- Selecciona **"Free"** (0$/mes)

### 3.4 Configurar variables de entorno
1. Scroll hacia abajo hasta **"Environment Variables"**
2. Agrega estas variables:

```
NODE_ENV = production
DISCORD_TOKEN = tu_token_copiado_del_paso_2.4
WELCOME_CHANNEL_ID = id_del_canal_de_bienvenida
```

**Para obtener WELCOME_CHANNEL_ID:**
1. En Discord, ve a Configuración → Avanzado → Modo desarrollador ✅
2. Haz clic derecho en tu canal de bienvenida
3. Selecciona **"Copiar ID"**

### 3.5 Desplegar
1. Clic **"Create Web Service"**
2. Render comenzará a construir tu bot
3. **Espera 3-5 minutos** (primera vez toma más tiempo)

---

## 🔍 PASO 4: Verificar que funciona

### 4.1 Ver logs
1. En tu servicio de Render, ve a **"Logs"**
2. Deberías ver:
```
🤖 Exile#1234 está conectado y listo!
📊 Sirviendo en 1 servidor(es)
🔄 Bot activo - 2026-02-05T...
```

### 4.2 Probar el bot
1. En tu servidor Discord, escribe: `!test-welcome`
2. El bot debería responder con una imagen de prueba

### 4.3 Probar bienvenida real
1. Crea una cuenta de prueba en Discord
2. Únela a tu servidor
3. Verifica que aparezca la imagen de bienvenida

---

## 🎨 PASO 5: Personalizar imágenes (Opcional)

### 5.1 Agregar imagen de fondo personalizada
**Opción A: URL externa (Recomendado)**
```javascript
// En index.js, reemplaza:
const background = await Canvas.loadImage('./assets/background.jpg');
// Por:
const background = await Canvas.loadImage('https://tu-url-de-imagen.com/background.jpg');
```

**Opción B: Subir a tu repositorio**
1. Agrega `background.jpg` a la carpeta `assets/`
2. Haz commit y push
3. Render se actualizará automáticamente

### 5.2 Agregar fuente personalizada
1. Descarga una fuente medieval (.ttf)
2. Súbela a `assets/medieval-font.ttf`
3. Commit y push

---

## 🛠️ PASO 6: Mantenimiento

### 6.1 Ver logs en tiempo real
```bash
# Instalar Render CLI (opcional)
npm install -g @render/cli
render login
render logs -f tu-servicio-id
```

### 6.2 Actualizar el bot
1. Haz cambios en tu código local
2. `git add .`
3. `git commit -m "Actualización"`
4. `git push`
5. Render se actualiza automáticamente

### 6.3 Reiniciar el bot
1. En Render dashboard
2. Ve a tu servicio
3. Clic **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### ❌ Bot no se conecta
**Problema**: Error de token
**Solución**: 
1. Verifica que `DISCORD_TOKEN` esté correcto
2. Regenera el token en Discord Developer Portal
3. Actualiza la variable en Render

### ❌ No genera imágenes
**Problema**: Error de Canvas
**Solución**:
1. Verifica los logs en Render
2. Canvas se instala automáticamente en Render
3. Si falla, usa el fondo por defecto (ya configurado)

### ❌ No responde a comandos
**Problema**: Intents no habilitados
**Solución**:
1. Ve a Discord Developer Portal
2. Bot → Privileged Gateway Intents
3. Habilita **Server Members Intent**

### ❌ Se desconecta frecuentemente
**Problema**: Plan gratuito se "duerme"
**Solución**:
- Ya incluí código para mantenerlo activo
- El bot se mantiene despierto automáticamente

---

## 📊 LÍMITES DEL PLAN GRATUITO

- **750 horas/mes** (31 días × 24 horas = 744 horas)
- **0.5GB RAM** (suficiente para tu bot)
- **Se duerme después de 15 min** sin actividad (pero se despierta automáticamente)
- **Builds ilimitados**

---

## 🎉 ¡LISTO!

Tu bot Exile ahora está funcionando 24/7 en Render.com completamente GRATIS.

### URLs importantes:
- **Dashboard**: https://dashboard.render.com
- **Logs**: https://dashboard.render.com/web/tu-servicio-id
- **Discord Developer**: https://discord.com/developers/applications

### Comandos útiles:
- `!test-welcome` - Probar imagen de bienvenida
- Ver logs en Render para debugging

---

**¡Que comience el exilio!** 🏰⚔️