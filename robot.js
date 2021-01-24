class Robot {
  // a robot hava a orientation W N E S;
  orientations = ['W', 'N', 'E', 'S'];
  steps = [];
  lost = false;

  constructor(position) {
    this.x = parseInt(position[0]);
    this.y = parseInt(position[1]);
    this.orientation = position[2];
    this.steps.push(this.getPosition())
  }

  run(instruction) {
    let indexOf = this.orientations.indexOf(this.orientation);
      switch (instruction) {
        case 'L':
          indexOf = indexOf === 0 ? 3 : indexOf - 1;
          this.orientation = this.orientations[indexOf];
          break;
        case 'R':
          indexOf = indexOf === 3 ? 0 : indexOf + 1;
          this.orientation = this.orientations[indexOf];
          break;
        case 'F':
          this.forward();
          break;
      }
      this.steps.push(this.getPosition());
  }


  getPosition() {
    return {x: this.x, y: this.y, orientation: this.orientation, lost: this.lost};
  }

  setPosition(position) {
    this.x = position.x;
    this.y = position.y;
    this.orientation = position.orientation;
  }

  getLastStep() {
    return this.steps[this.steps.length - 1] ;
  }

  forward() {
    switch (this.orientation) {
      case 'N':
        this.y = this.y + 1;
        break;
      case 'S':
        this.y = this.y - 1;
        break;
      case 'W':
        this.x = this.x - 1;
        break;
      case 'E':
        this.x = this.x + 1;
        break;
    }
  }

  /**
  * Set to lost robot and its current position
  * changes to the previous coordinate
  * the off-map coordinate is not saved in the
  * history robot steps
  * return the position with LOST string
  * @return {number, number, string, boolean}
  */
  setLost() {
    this.lost = true;
    this.steps.pop();
    this.steps[this.steps.length - 1].lost = this.lost;
    this.setPosition(this.getLastStep());
    return this.getLastStep();
  }


  /**
  * current position changes to the previous coordinate
  * the off-map coordinate is skipped and not saved in the
  * history robot steps
  * return the position
  * @return {number, number, string, boolean}
  */
  backward() {
    this.lost = false;
    this.steps.pop();
    this.setPosition(this.getLastStep());
  }
}

module.exports = Robot;
