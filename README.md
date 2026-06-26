# Pizarra Colaborativa en Tiempo Real

Aplicación web que permite a múltiples usuarios dibujar simultáneamente sobre un canvas compartido. Los trazos de cada usuario se sincronizan en tiempo real para todos los participantes conectados mediante WebSockets.

## ¿Cómo funciona?

Cuando un usuario dibuja sobre el canvas, los datos del trazo (coordenadas, color, grosor) se envían al servidor a través de una conexión WebSocket. El servidor retransmite esos datos a todos los demás clientes conectados, quienes los renderizan en su propio canvas de forma inmediata.

```
Usuario A dibuja → servidor recibe → retransmite a B y C → B y C ven el trazo
```

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML5 Canvas API + JavaScript vanilla |
| Backend | Node.js + Express |
| Tiempo real | Socket.io |

## Estructura del proyecto

```
/
├── public/
│   ├── index.html        # Página principal
│   ├── css/
│   │   └── styles.css    # Estilos
│   └── js/
│       ├── socket.js     # Conexión WebSocket y eventos remotos
│       ├── canvas.js     # Lógica de dibujo y emisión de eventos
│       └── app.js        # Punto de entrada
├── server.js             # Servidor HTTP + WebSocket
├── package.json
└── .gitignore
```

## Requisitos

- [Node.js](https://nodejs.org) v18 o superior
- npm (incluido con Node.js)

## Instalación e inicio

```bash
# 1. Clonar el repositorio
git clone https://github.com/IIC3585-2026-1/2026-1-t8-g1.git
cd 2026-1-t8-g1

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

El servidor queda disponible en `http://localhost:3000`.

Para probar la colaboración en tiempo real, abre la misma URL en dos pestañas o navegadores distintos y dibuja en una de ellas.

## Uso

- **Dibujar:** mantén el clic izquierdo presionado y arrastra el mouse sobre el canvas.
- Los trazos de los demás usuarios aparecen automáticamente en tu pantalla.
