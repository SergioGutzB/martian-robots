const Robot = require('./robot');
const MarsSurface = require('./mars-surface');
const fs = require('fs');

////////////////////////////////////////////////
/////////////////// MAIN ///////////////////////
////////////////////////////////////////////////


function main() {
  // read inputs instructions from input.tx file
  fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let inputs = data.split('\n');
    inputs = inputs.filter((str) => str !== "");
    let size = inputs.shift().split(" ");

    // create a new mars surface object;
    // limit grid size to maximun 50
    const gridSize = maxminCordinate(parseCordinate(size));
    const mars = new MarsSurface(gridSize);
    const {robots, instructions} = generateRobotsAndInstructions(inputs);

    mars.addRobots(robots);
    mars.runAllRobots(instructions);
    printLastSteps(mars.robots)
  });
}

function generateRobotsAndInstructions(directions = []) {
  let robots = [];
  let instructions = [];
  for (let i = 1; i <= directions.length; i += 2) {
    let position =  directions[i - 1].split(" ");
    // limit the maximun an minimun value for any cordinate
    robots.push(new Robot(maxminCordinate(parsePosition(position))));
    // limit string instruction should be less than 100 characteres
    instructions.push(directions[i].slice(0, 100));
  }
  return {robots, instructions};
}

function printLastSteps(robots) {
  robots.forEach(robot => {
    let pos = robot.getPosition();
    console.log(`${pos.x} ${pos.y} ${pos.orientation} ${pos.lost? 'LOST' : ''}`);
  });
}

/**
* Convert array of length two to object {x: number, y: number}
* @{params} cordinate [string, string]
* @{return} cordinate {x: number, y: number}
*/
function parseCordinate(cordinate) {
  return {x: parseInt(cordinate[0]), y: parseInt(cordinate[1])}
}

/**
* Convert position array of length three to object {x: number, y: number, orientation: string}
* @{params} cordinate [string, string, string]
* @{return} cordinate {x: number, y: number, orientation: string}
*/
function parsePosition(position) {
  return {...parseCordinate(position), orientation: position[2]}
}

/**
* Limit the maximun value of any cordinate to 50
* and limint the minimun value of any cordinate to 0
* @{params} cordinate {x: number, y: number} -> {x: 60, y: -19}
* @{return} cordinate {x: number, y: number} -> {x: 50, y: 0}
*/
function maxminCordinate(cordinate) {
  if (cordinate.x > 50) {
    cordinate.x = 50;
  }
  if (cordinate.y > 50) {
    cordinate.y = 50;
  }
  if (cordinate.x < 0) {
    cordinate.x = 0
  }
  if (cordinate.y < 0) {
    cordinate.y = 0
  }
  return cordinate;
}

main();
