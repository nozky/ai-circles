import { Circle } from "../module/Circle.mjs";

const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const circlesCount = document.querySelector('#circles-count');
const velocity = document.querySelector('#speed');
const maxRadius = document.querySelector('#max-radius');
const backgroundColor = document.querySelector('#background-color');
const circleColor = document.querySelector('#circle-color');
const interaction = document.querySelector('#interaction');
const randomColor = document.querySelector('#random-color');


let circles = [];


// declare variables
const canvasWrapper = document.querySelector('.canvas-wrapper');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

// set canvas size 
const setCanvasSize =(width,height)=>{
  canvas.width = width;
  canvas.height = height;
  canvas.style.background = backgroundColor.value;
}


// init canvas size
setCanvasSize(canvasWrapper.clientWidth, canvasWrapper.clientHeight);


// init Circle
const init = ()=>{
  let numberOfCircle = circlesCount.value;

  for ( let i=0; i < numberOfCircle; i++) {
    let xPos = Math.floor( Math.random() * canvasWrapper.clientWidth);
     let yPos = Math.floor(Math.random() * canvasWrapper.clientHeight);
    let radius = Math.floor(Math.random() * parseInt(maxRadius.value) + 1);
    let color = ranColor(randomColor.checked);

    let speed = parseInt(velocity.value);
    speed = (Math.floor(Math.random() * 10)+1) % 2 ? --speed : ++speed; 
  
    // create array of objects
    let newCircle = new Circle(xPos,yPos,radius,color,speed,canvas)
    circles.push(newCircle);
  }
}


// set canvas size when window resize
window.addEventListener('resize',()=>{
  setCanvasSize(canvasWrapper.clientWidth, canvasWrapper.clientHeight);
})


// animate
const animate = ()=>{
  setInterval(()=>{ 
    // clear canvas before repositioning object
    context.clearRect(0,0,canvas.width, canvas.height);
    
    // check every circle conditions
    circles.forEach( circle => {
      circle.draw(context);
      // check 
      if(interaction.checked){circle.cDetect(circle,circles);}
      circle.move();
      circle.detectBorder(canvas.width, canvas.height);
    })
  },15)
}



// random color
const ranColor = (isEnable)=>{
  if (isEnable){
    const colors=['red','blue','green','white','pink','gold','orange','yellow','rebeccapurple'];
    let colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
  }else{
    return circleColor.value;
  }
}




// start animate
start.addEventListener('click',()=>{
  init();
  animate();
})

// stopPropagation();
stop.addEventListener('click',()=>{
  window.location.reload();
})