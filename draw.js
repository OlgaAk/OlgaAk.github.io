const animateBtn = document.getElementById("animateBtn");
const drawBtn = document.getElementById("drawBtn");
const redBtn = document.getElementById("red");
const yellowBtn = document.getElementById("yellow");
const greenBtn = document.getElementById("green");
const palette = document.getElementById("palette");

let savedCanvasImage = null;
let savedImageBitmap = null;

let drawMode = true;

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
ctx.canvas.height = window.innerHeight - palette.offsetHeight * 2;

ctx.lineWidth = "5";
ctx.strokeStyle = "green";
ctx.lineWidth = 15;

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
  if (!drawMode) return;
  drawMode = false;
  drawBtn.classList.remove("disabled");
  animateBtn.classList.add("disabled");
  palette.classList.add("hidden");
  animateLeftLeg();
  setTimeout(animateRightLeg, 100);
});

drawBtn.addEventListener("click", () => {
  drawMode = true;
  drawBtn.classList.add("disabled");
  animateBtn.classList.remove("disabled");
  palette.classList.remove("hidden");
  //   drawNose()
});

redBtn.addEventListener("click", () => {
  if (!drawMode) return;
  ctx.strokeStyle = "red";
  redBtn.classList.add("active");
  yellowBtn.classList.remove("active");
  greenBtn.classList.remove("active");
});

yellowBtn.addEventListener("click", () => {
  if (!drawMode) return;
  ctx.strokeStyle = "yellow";
  redBtn.classList.remove("active");
  yellowBtn.classList.add("active");
  greenBtn.classList.remove("active");
});

greenBtn.addEventListener("click", () => {
  if (!drawMode) return;
  ctx.strokeStyle = "green";
  redBtn.classList.remove("active");
  yellowBtn.classList.remove("active");
  greenBtn.classList.add("active");
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
  if (rightLegAnimated || lastAnimatedLeg == Legs.left) {
    window.requestAnimationFrame(animateLeftLeg);
    return
  };
  leftLegAnimated = true;
  ctx.save();

  ctx.beginPath();
  for (let point of leg1) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();
  ctx.clip();

  ctx.rotate((-1 * Math.PI) / 180);
  if (savedCanvasImage && savedImageBitmap) {
    ctx.drawImage(
      savedImageBitmap,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      img.width,
      img.height
    );
  } else {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
  }
  setTimeout(() => {
    ctx.restore();
    if (savedCanvasImage && savedImageBitmap) {
      ctx.drawImage(
        savedImageBitmap,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        img.width,
        img.height
      );
    } else {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
    }

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
  if (leftLegAnimated || lastAnimatedLeg == Legs.right) {
    window.requestAnimationFrame(animateRightLeg);
    return
};

  rightLegAnimated = true;
  ctx.save();
  ctx.beginPath();
  for (let point of leg2) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();
  ctx.clip();

  ctx.rotate((-1 * Math.PI) / 180);
  if (savedCanvasImage && savedImageBitmap) {
    ctx.drawImage(
      savedImageBitmap,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      img.width,
      img.height
    );
  } else {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
  }

  setTimeout(() => {
    ctx.restore();
    if (savedCanvasImage) {
      ctx.drawImage(
        savedImageBitmap,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        img.width,
        img.height
      );
    } else {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 600);
    }
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
  if (!drawMode) return;
  ctx.beginPath();
  ctx.setLineDash([]);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
};

const stopDraw = () => {
  canvas.removeEventListener("mousemove", draw);
  canvas.removeEventListener("touchmove", draw);
  saveCanvasImage();
};

const saveCanvasImage = () => {
  savedCanvasImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  createImageBitmap(savedCanvasImage).then((imageBitmap) => {
    savedImageBitmap = imageBitmap;
  });
};

const isOutsideContour = (x, y) => {
  let inside = isInsideCircle(x, y, 490, 335, 240);
  if (inside) return !inside;
  inside = isInsideCircle(x, y, 238, 425, 100);
  if (inside) return !inside;
  return !isInsideCircle(x, y, 60, 355, 30);
};

const isInsideCircle = (x, y, circleX, circleY, radius) => {
  return (
    Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2) < Math.pow(radius, 2)
  );
};

const draw = (event) => {
  let x, y;
  if (event.type == "mousemove") {
    var bounding = canvas.getBoundingClientRect();
    x = event.clientX - bounding.left;
    y = event.clientY - bounding.top;
  } else {
    const touch = event.touches[0];
    x = touch.pageX;
    y = touch.pageY;
  }
  console.log(x, y);

  if (isOutsideContour(x, y)) return;
  ctx.lineTo(x, y);
  ctx.stroke();
};

canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousedown", startDraw);

canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchend", stopDraw);
