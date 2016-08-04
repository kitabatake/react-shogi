import React from 'react';
import Koma from './koma.js'

class Kaku extends Koma {

  getNormaMovement() {
    return {
      goOn: {
        num: 4,
        dx: [-1, 1, 1, -1],
        dy: [-1, -1, 1, 1]
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
        dx: [-1, 1, 1, -1],
        dy: [-1, -1, 1, 1]
      }
    }
  }

  _render() {
    return this.narigoma? '馬' : '角'
  }

}
export default Kaku