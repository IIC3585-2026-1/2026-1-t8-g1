const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 600;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let currentColor = '#000000';
let currentLineWidth = 4;


// Controles selector de color
document.querySelectorAll(".swatch").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Deseleccionar color actual
    document.querySelector(".swatch.active")?.classList.remove("active");
    // Marcar nuevo color como seleccionado
    btn.classList.add("active");
    currentColor = btn.dataset.color; // Mapea con data-color de los botones en el index
    document.getElementById("color-picker").value = currentColor;
  });
});

document.getElementById("color-picker").addEventListener("input",  (event) => {
  currentColor = event.target.value;
  document.querySelector(".swatch.active")?.classList.remove("active");
});

document.getElementById("line-width").addEventListener("input", (event) => {
  currentLineWidth = event.target.value;
  document.getElementById('line-width-val').textContent = event.target.value + 'px';
});


function getCanvasPos(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}

function drawSegment(x0, y0, x1, y1, color, lineWidth) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function onDrawStart(clientX, clientY) {
  isDrawing = true;
  const pos = getCanvasPos(clientX, clientY);
  lastX = pos.x;
  lastY = pos.y;
}

function onDrawMove(clientX, clientY) {
  if (!isDrawing) return;

  const pos = getCanvasPos(clientX, clientY);
  drawSegment(lastX, lastY, pos.x, pos.y, currentColor, currentLineWidth);

  socket.emit('draw:segment', {
    x0: lastX,
    y0: lastY,
    x1: pos.x,
    y1: pos.y,
    color: currentColor,
    lineWidth: currentLineWidth,
  });

  lastX = pos.x;
  lastY = pos.y;
}

function onDrawEnd() {
  isDrawing = false;
}

// Mouse
canvas.addEventListener('mousedown', (e) => onDrawStart(e.clientX, e.clientY));
canvas.addEventListener('mousemove', (e) => onDrawMove(e.clientX, e.clientY));
canvas.addEventListener('mouseup', onDrawEnd);
canvas.addEventListener('mouseleave', onDrawEnd);

// Touch
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  onDrawStart(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  onDrawMove(touch.clientX, touch.clientY);
});

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  onDrawEnd();
});
