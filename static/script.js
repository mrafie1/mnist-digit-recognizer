const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

const cX = canvas.offsetLeft;
const cY = canvas.offsetTop;

// canvas.width = window.innerWidth - cX;
// canvas.height = window.innerHeight - cY;
const size = 560;
canvas.width = size;
canvas.height = size;


ctx.strokeStyle = 'white';
ctx.lineWidth = 25;
ctx.lineCap = 'round';
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;
let startX;
let startY;

const draw = (e) => {
    if (!drawing) {
        return;
    }

    ctx.lineTo(e.clientX - cX, e.clientY - cY);
    ctx.stroke();
    // const rect = canvas.getBoundingClientRect();
    // const x = e.clientX - rect.left;
    // const y = e.clientY - rect.top;
    // console.log(y)
    // console.log(e.clientY)

    // ctx.lineTo(x, y);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(x, y);
}


canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.screenX
    startY = e.screenY
    // console.log("Hello")
    // drawing = true;
    // const { x, y } = getMousePos(e);
    // ctx.beginPath();
    // ctx.moveTo(x, y);
});

canvas.addEventListener('mouseup', e => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    console.log("Cleared!");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getResult() {
    const dataURL = canvas.toDataURL('image/png');
    fetch('/predict', {                            
        method: 'POST',
        body: JSON.stringify({ image: dataURL }),   
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())                       
    .then(data => {
        console.log(data.prediction);
        document.getElementById('result').innerText = 'Result: ' + data.prediction; 
    });
}