import React from 'react';
import Koma from './koma.js'

class Keima extends Koma {

  getMovement() {
    return {
      num: 2,
      dx: [-1, 1],
      dy: [-2, -2]
    }
  }

  getNarigomaMovement() {
    return {
      num: 6,
      dx: [-1, 0, 1, -1, 1, 0],
      dy: [-1, -1, -1, 0, 0, 1]
    }
  }

  _render() {
    return this.narigoma? '金' : '桂'
  }

}
export default Keima