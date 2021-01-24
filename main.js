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
    const mars = new MarsSurface(parseInt(size[0]), parseInt(size[1]));
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
    robots.push(new Robot(position));
    instructions.push(directions[i]);
  }
  return {robots, instructions};
}

function printLastSteps(robots) {
  robots.forEach(robot => {
    let pos = robot.getPosition();
    console.log(`${pos.x} ${pos.y} ${pos.orientation} ${pos.lost? 'LOST' : ''}`);
  });
}


main();
