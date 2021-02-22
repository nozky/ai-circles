export class Circle{
 
  constructor(x ,y, radius, color, speed, canvas){
    this.xPos = x;
    this.yPos =y;
    this.radius = radius;
    this.color = color;
    this.xSpeed = speed;
    this.ySpeed = speed;
  }

  draw(context){
    context.beginPath();
    context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
    context.closePath();

    context.strokeStyle = 'black';
    context.stroke();
    
    context.fillStyle = this.color;
    context.fill();
  }

  move(){
    this.xPos = this.xPos + this.xSpeed;
    this.yPos = this.yPos + this.ySpeed;
  }

  detectBorder(canWidth, canHeigth){
    
    // right border
    if( this.xPos >= (canWidth-this.radius)){
      this.xSpeed = -this.xSpeed;
    }
    
    // bottom border
    if (this.yPos >= (canHeigth-this.radius)){
      this.ySpeed = -this.ySpeed;
    }
    
    // top border
    if (this.xPos <= (this.radius)){
     this.xSpeed =  ++this.xSpeed;
    }

    // left border
    if (this.yPos <= (this.radius)){
      this.ySpeed = ++this.ySpeed;;
    }

  }

  cDetect(circle,arrCircles){
   
    for (let i=0; i< arrCircles.length; i++){
      // interaction x axis
      if( ((circle.xPos + circle.radius) > arrCircles[i].xPos + arrCircles[i].radius) || ((circle.xPos + circle.radius) < arrCircles[i].xPos + arrCircles[i].radius)  ){
        circle.xSpeed = -circle.xSpeed;
        arrCircles[i].xSpeed = -arrCircles[i].xSpeed;
      }

      // interaction y axix
      if( ((circle.yPos + circle.radius) > arrCircles[i].yPos + arrCircles[i].radius) || ((circle.yPos + circle.radius) < arrCircles[i].yPos + arrCircles[i].radius)){
        circle.ySpeed = -circle.ySpeed;
        arrCircles[i].ySpeed = -arrCircles[i].ySpeed;
      }
    }
   
  }

}
