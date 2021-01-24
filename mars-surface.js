class MarsSurface {
  robots = [];
  lostRobots = [];

  constructor(sizeX, sizeY) {
    this.mapSize = {
      x: sizeX,
      y: sizeY
    };
  }

  addRobots(robots) {
    this.robots = robots;
  }

  runAllRobots(instructions) {
    if(instructions.length) {
      this.robots.forEach((robot, index) => {
        this.runRobot(robot, instructions[index].split(""));
      });
    }
  }

  runRobot(robot, instructions) {
    if (robot && instructions) {
      let newPosition;
      let index = 0;
      while (index < instructions.length && !robot.lost) {
        robot.run(instructions[index])
        index++;
        if (this.isLost(robot.x, robot.y)) {
          const indexLast = robot.steps.length - 2;
          let lastPosition = robot.steps[indexLast];
          if (this.hasScent(lastPosition)) {
            robot.backward(lastPosition);
          } else {
            this.lostRobots.push(robot.setLost());
          }
        }
      }
    }
  }

  hasScent(position) {
    return this.lostRobots.some(psl => psl.x === position.x && psl.y === position.y )
  }

  isLost(x, y) {
    return x > this.mapSize.x || x < 0 || y > this.mapSize.y || y < 0 ? true : false;
  }

}

module.exports = MarsSurface;
