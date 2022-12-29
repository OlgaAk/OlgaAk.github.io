const animateBtn = document.getElementById("animateBtn");
const drawBtn = document.getElementById("drawBtn");
let drawMode = false;

const leg1 = [
  {
    x: 358,
    y: 515,
  },

  {
    x: 358,
    y: 585,
  },
  {
    x: 428,
    y: 585,
  },
  {
    x: 428,
    y: 515,
  },
];

const leg2 = [
  {
    x: 488,
    y: 515,
  },

  {
    x: 488,
    y: 585,
  },
  {
    x: 558,
    y: 585,
  },
  {
    x: 558,
    y: 515,
  },
];



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.lineWidth = "5";
ctx.strokeStyle = "green";

const img = new Image();
img.src = "./hedgehog.jpg";

img.onload = function (e) {
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
};

const drawNose = () => {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.strokeStyle = "yellow";
  ctx.setLineDash([5, 3]); /*dashes are 5px and spaces are 3px*/
  ctx.arc(60, 325, 30, 0, 2 * Math.PI);

  ctx.stoke();
  ctx.fill();

  ctx.clip();
};

animateBtn.addEventListener("click", () => {
  drawMode = false;
  animateLeftLeg();
  setTimeout(animateRightLeg, 100);
});

drawBtn.addEventListener("click", () => {
  drawMode = true;
  drawNose()
});

const Legs = {
  right: "right",
  left: "left",
};

let leftLegAnimated = false;
let lastAnimatedLeg;
let rightLegAnimated = false;

const animateLeftLeg = (callback) => {
  if (drawMode) return;
  console.log("rightLegAnimated " + rightLegAnimated);
  console.log("lastAnimatedLeg == Legs.left " + lastAnimatedLeg == Legs.left);
  console.log(lastAnimatedLeg, Legs.left);
  if (rightLegAnimated || lastAnimatedLeg == Legs.left) return;
  leftLegAnimated = true;
  ctx.save();
  ctx.beginPath();
  for (let point of leg1) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();
  ctx.clip();

  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, -800, 600);

  setTimeout(() => {
    ctx.restore();
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
    leftLegAnimated = false;
    lastAnimatedLeg = Legs.left;

    setTimeout(() => {
      window.requestAnimationFrame(animateLeftLeg);
    }, 100);
  }, 100);
};

const animateRightLeg = (callback) => {
  if (drawMode) return;
  console.log("leftLegAnimated " + leftLegAnimated);
  console.log("lastAnimatedLeg == Legs.right " + lastAnimatedLeg == Legs.right);
  if (leftLegAnimated || lastAnimatedLeg == Legs.right) return;

  rightLegAnimated = true;
  ctx.save();
  ctx.beginPath();
  for (let point of leg2) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();
  ctx.clip();

  ctx.rotate((-1 * Math.PI) / 180);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);

  setTimeout(() => {
    ctx.restore();
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
    rightLegAnimated = false;
    lastAnimatedLeg = Legs.right;

    setTimeout(() => {
      window.requestAnimationFrame(animateRightLeg);
    }, 100);
  }, 100);
};

window.addEventListener("resize", () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
});

const startDraw = () => {
  ctx.strokeStyle = "green";
  ctx.setLineDash([]);
  canvas.addEventListener("mousemove", draw);
};

const stopDraw = () => {
  canvas.removeEventListener("mousemove", draw);
  ctx.beginPath();
};

const draw = (event) => {
  console.log(event.clientX, event.clientY);

  if (
    Math.pow(event.clientX - 60, 2) + Math.pow(event.clientY - 325, 2) >
    30 * 30
  ) {
    console.log("outside");
  } else {
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
  }
};

canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousedown", startDraw);
