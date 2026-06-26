const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor. ID:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor.');
});

socket.on('draw:segment', (data) => {
  drawSegment(data.x0, data.y0, data.x1, data.y1, data.color, data.lineWidth);
});
