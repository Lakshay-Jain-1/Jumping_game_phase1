let canvas = document.getElementById("player")
let context = canvas.getContext("2d")
let detection= false // will work in collision detection


class Player{
  constructor(){
    this.position={ 
      x:0 ,
      y:100 ,
    }
   }
  
  draw(){
    context.fillStyle="blue"
    if(this.position.x>260){ // right side se bhar na jaaye
      this.position.x=260
      context.fillRect(260,this.position.y,35,35)
      return;
    }else if(this.position.x < 0){  // left side se bhar na jaaye 
      this.position.x=0
      
      context.fillRect(0,this.position.y,35,35)
     
    }
      else if(this.position.y < 0){  // uppar side se bhar na jaaye 
        this.position.y=0
        context.fillRect(this.position.x,this.position.y,35,35)
        
      }
        else if(this.position.y >110 ){  // uppar side se bhar na jaaye 
          this.position.y=110
          context.fillRect(this.position.x,this.position.y,35,35)
        }
    else{
    context.fillRect(this.position.x,this.position.y,35,35)
    }
    
  }
}




class Enemy{
  constructor(x_ps,y_ps){
    this.position={
      x:x_ps,
      y:y_ps
    }
  }
  draw(){
    context.fillStyle="red"
    context.fillRect(this.position.x,this.position.y,50,10)
    
  }
}


let platformPositions= [
                    {x:100,y: 90},
                    {x:50,y:70},
                    {x:140,y:100},
                    
                    {x:250,y:70},
                    {x:350,y:70},
                    {x:300,y: 90},
                     {x:450,y:70},
                    {x:420,y:100},
  {x:490,y: 90},
  {x:550,y:70},
  {x:650,y:70}
                    ]


const platforms = platformPositions.map(
  (platform) => new Enemy(platform.x, platform.y)
);




let player = new Player()
player.draw()


function animate(x_position, y_position) {

  platforms.forEach((platform) => {
    platform.draw();
  });
  function platformmove(){
    platforms.forEach((platform) => {
context.clearRect(platform.position.x, platform.position.y,50,10);
      platform.position.x -= x_position;
         platform.position.y -= y_position;

      context.fillRect(platform.position.x, platform.position.y,50,10);
    });
   

  }
platformmove()
  // whenever box is colliding with platform its y position can't be changed everything can be changed 

  platforms.forEach((platform) => {
    if (
      player.position.y + 35 >= platform.position.y &&
      player.position.y <= platform.position.y + 10 &&
      player.position.x + 35 >= platform.position.x &&
      player.position.x <= platform.position.x + 50
    ) {
      console.log(1);
      context.clearRect(player.position.x, player.position.y, 35, 35);
      player.position.y = platform.position.y - 35;
     
      player.draw()
      detection = true;
    }
  });



 //--------------------
  if(!detection){
  context.clearRect(player.position.x, player.position.y, 35, 35);
  player.position.x += x_position;
  player.position.y += y_position;
  player.draw(); 
  }
 detection=false
}
console.log(player.position.x)



 


document.addEventListener("keydown",({key})=>{
  
  switch(key){
    case "ArrowLeft":
      animate(-10,0)
     
      break;
    case "ArrowRight":
      animate(10,0)
      break;
    case "ArrowUp":
        animate(0,-10)
        break;
    case "ArrowDown":
        animate(0,10)
        break;
  }
})


