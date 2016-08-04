import React from 'react';
import Koma from './koma.js'

class Hisya extends Koma {

  getNormaMovement() {
    return {
      goOn: {
        num: 4,
        dx: [0, 1, 0, -1],
        dy: [-1, 0, 1, 0]
      }
    }
  }

  getNarigomaMovement() {
    return {
      normal : {
        num: 8,
        dx: [-1, 0, 1, -1, 1, -1, 0, 1],
        dy: [-1, -1, -1, 0, 0, 1, 1, 1]
      },
      goOn: {
        num: 4,
        dx: [0, 1, 0, -1],
        dy: [-1, 0, 1, 0]
      }
    }
  }

  _render() {
    return this.narigoma? '竜' : '飛'
  }

}
export default Hisya