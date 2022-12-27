const startPathBtn = document.getElementById("startPath");
const endPathBtn = document.getElementById("endPath");

const leg1 = [
    {
        "x": 358,
        "y": 515
    },

    {
        "x": 358,
        "y": 585
    
    },
    {
        "x": 428,
        "y": 585
    
    },
    {
        "x": 428,
        "y": 515
    
    },

]

// endPathBtn.addEventListener("click", () => {
//     console.log(leg1)
// })

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.lineWidth = "5";
ctx.strokeStyle = "green";

const img = new Image();
img.src = './hedgehog.jpg';

img.onload = function (e) {
    ctx.drawImage(img,0,0,img.width,img.height,0,0,800,600);
//     ctx.beginPath()
//     ctx.fillStyle = 'rgba(0,0,0,0.1)';
//     ctx.strokeStyle = 'yellow';
//     ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
// ctx.arc(60, 325, 30, 0, 2 * Math.PI);

// ctx.stoke()
// ctx.fill()

// ctx.clip();

}



let flipped = false;

const animate = () => {
    setTimeout( () => {
    ctx.beginPath()
    for(let point of leg1) {

        ctx.lineTo(point.x, point.y)

    }

    ctx.closePath()

    ctx.clip()
  console.log(flipped)

 if (!flipped) {
    ctx.save()
    ctx.scale(-1, 1);
    ctx.drawImage(img,0,0,img.width,img.height,0,0,-800,600);
    
 } else {
    ctx.restore()
    ctx.drawImage(img,0,0,img.width,img.height,0,0,800,600);
 }
   
    flipped = !flipped

    window.requestAnimationFrame(animate)
    
//ctx.scale(-1, 1);
    }, 500)

    
}


animate()


window.addEventListener("resize", () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})


const startDraw = () => {

    ctx.strokeStyle = "green";
    ctx.setLineDash([]);
    canvas.addEventListener("mousemove", draw);
} 

const stopDraw = () => {
    canvas.removeEventListener("mousemove", draw);
    ctx.beginPath();
} 



const draw = event => {
  
    console.log(event.clientX, event.clientY)

   if ( Math.pow(event.clientX - 60, 2) + Math.pow(event.clientY - 325, 2) > 30*30)  {
    console.log('outside')
   } else {
    ctx.lineTo(event.clientX, event.clientY);
    // leg1.push({x: event.clientX, y: event.clientY})
    ctx.stroke();
   }
       
};

canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousedown", startDraw);

   