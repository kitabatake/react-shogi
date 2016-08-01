import React from 'react';
import Koma from './koma.js'

class Hu extends Koma {

  getMovement() {
    return {
      num: 1,
      dx: [0],
      dy: [-1]
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
    return this.narigoma? 'と' : '歩'
  }

}
export default Hu