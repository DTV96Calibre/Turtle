entities = [];
board = {width:4, length:4}

function setup() {
  createCanvas(100*board.width, 100*board.length);
  turtle = new Computer("turtle", 2, 3);
  entities.push(turtle);
}

function draw() {
    background(60,120,60);
    entities.forEach(function(item){
    item.render();
    });
}

function keyPressed(key) {
  if (keyCode === LEFT_ARROW) {
    turtle.moveLeft(1);
  } else if (keyCode === RIGHT_ARROW) {
    turtle.moveRight(1);
  } else if (keyCode === UP_ARROW) {
    turtle.moveUp(1);
  } else if (keyCode === DOWN_ARROW) {
    turtle.moveDown(1);
  } else if (keyCode === 87) { // w
  	turtle.moveForward(1);
  } else if (keyCode === 65) { // a
    turtle.turnLeft(1);
  } else if (keyCode === 68) { // d
  	turtle.turnRight(1);
  }
  console.log(turtle.direction);
}


function Computer(name="Hello", x=0, y=0, direction=1) {
  this.tasks = new Queue();
  this.width = 100;
	this.pos = {x:x,y:y};
  this.direction = direction;
  this.name = name;
  this.render = function(){
  		fill(255,255,120);
    	rect(this.pos.x*this.width,this.pos.y*this.width,this.width,this.width);
      var circle_pos = {x:0, y:0};
      switch(this.direction){
      	case 0: circle_pos = {x:0, y:-1*width/2}; break;
        case 1: circle_pos = {x:width/2, y:0}; break;
        case 2: circle_pos = {x:0, y:width/2}; break;
        case 3: circle_pos = {x:-1*width/2, y:0}; break;
      }
      ellipse(this.pos.x*this.width+circle_pos.x,
      				this.pos.y*this.width+circle_pos.y,
      				this.width/2);
    }
  this.moveLeft = function(n){
    this.pos.x = max(0,this.pos.x-n);
  }
  this.moveRight = function(n){
  	this.pos.x = min(board.width-1,this.pos.x+n);
  }
  this.moveUp = function(n){
    this.pos.y = max(0,this.pos.y-n);
  }
  this.moveDown = function(n){
  	this.pos.y = min(board.length-1,this.pos.y+n);
  }
  this.moveForward = function(n){
  	switch(this.direction){
    	case 0:
      this.moveUp(n)
      break;
      case 1:
      this.moveRight(n);
      break;
      case 2:
      this.moveDown(n);
      break;
      case 3:
      this.moveLeft(n);
      break;
    }
  }
  this.turnRight = function(n){
  	this.direction = ((this.direction+n) + 4) % 4;
  }
  this.turnLeft = function(n){
  	this.turnRight(-1*n);
  }
  this.run = function(){
    var task = tasks.pop();
    while(task !== undefined){
      this.call(task[operation], task[param]);
      task = tasks.pop();
    }
  }
  this.queueTask = function(operation, param){
    tasks.push({operation:operation, param:param});
  }
}

function Queue() {
  this.data = [];
  // Array.prototype.push appends to the end of the array instead of the beginning, so do our own implementation here
  this.push = function(record){
    this.data.unshift(record);
  }
  this.pop = function(){
    return this.data.pop();
  }
}
