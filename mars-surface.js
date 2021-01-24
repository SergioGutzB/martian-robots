let mapSize = {
  x: 0,
  y: 0
};
const orientations = ['W', 'N', 'E', 'S'];

let robots = [];

let input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL

3 2 N
FFRFLFF

4 3 N
FFRFF

5 3 E
FRRF

0 0 W
RFRFRFFRF
`;

let robotLost = [];

function setMapSize(x = 0, y = 0) {
  mapSize = {
    x,
    y
  };
}

function main() {
  let inputs = input.split('\n');
  let size = inputs.shift().split(" ");
  setMapSize(parseInt(size[0]), parseInt(size[1]));
  inputs = inputs.filter((str) => str !== "");
  this.generateRobots(inputs)
  let index = 1;
  robots.forEach(robot => {
    runDirections(robot.position, robot.instructions.split(""));
  });
}

function generateRobots(directions = []) {
  for (let i = 1; i <= directions.length; i += 2) {
    let x = directions[i - 1].split(' ')
    robots.push({
      position: directions[i - 1].split(" "),
      instructions: directions[i]
    });
  }
}

function runDirections(position = null, instructions = null) {
  let steps = [];
  let orientation = position[2];
  let cordinate = [parseInt(position[0]), parseInt(position[1])]

  if (position && instructions) {
    let newIndexOf = orientations.indexOf(orientation)
    let newPosition;
    let lost = false;
    let newCordinate = cordinate;
    let index = 0;
    while (index < instructions.length && !lost) {
      let instruction = instructions[index]
      index++;
      let indexOf = newIndexOf;
      switch (instruction) {
        case 'L':
          newIndexOf = indexOf === 0 ? 3 : indexOf - 1;
          break;
        case 'R':
          newIndexOf = indexOf === 3 ? 0 : indexOf + 1;
          break;
        case 'F':
          newCordinate = getForwardCordinate(cordinate, orientation)
          break;
        default:
          newIndexOf = 0;
      }
      orientation = orientations[newIndexOf];
      if (newCordinate === -1) {
        if (steps.length) {
          const indexLast = steps.length - 1;
          let lastCordinate = steps[indexLast];
          lastCordinate = [lastCordinate[0], lastCordinate[1]];
          if (!checkScent(lastCordinate)) {
            lost = true;
          }
          robotLost.push(lastCordinate);
          steps[indexLast] = [...lastCordinate, orientation, lost ? 'LOST' : 'SKIP']
        } else {
          if (!checkScent(cordinate)) {
            lost = true;
          }
          steps.push([...cordinate, orientation, lost ? 'LOST' : 'SKIP'])
        }
      } else {
        cordinate = newCordinate;

        steps.push([...newCordinate, orientation])
      }
    }
    console.log('steps: ', steps[steps.length - 1]);
  }
}

function getForwardCordinate(cordinate, orientation) {
  let newCordinate = [...cordinate];
  switch (orientation) {
    case 'N':
      newCordinate[1] = cordinate[1] + 1;
      break;
    case 'S':
      newCordinate[1] = cordinate[1] - 1;
      break;
    case 'W':
      newCordinate[0] = cordinate[0] - 1;
      break;
    case 'E':
      newCordinate[0] = cordinate[0] + 1;
      break;
  }
  return isLost(newCordinate) ? -1 : newCordinate
}

function isLost(cordinate) {
  return cordinate[0] > mapSize.x || cordinate[0] < 0 || cordinate[1] > mapSize.y || cordinate[1] < 0 ? true : false;
}

function checkScent(cordinate) {
  return robotLost.some(lost => JSON.stringify(lost) === JSON.stringify(cordinate))
}

main();
