import React from 'react';
import Koma from './koma.js'

class Ou extends Koma {

  getNormaMovement() {
    return {
      normal : {
        num: 8,
        dx: [-1, 0, 1, -1, 1, -1, 0, 1],
        dy: [-1, -1, -1, 0, 0, 1, 1, 1]
      } 
    }
  }

  canNareru() {
    return false
  }

  _render() {
    return '王'
  }

}
export default Ou