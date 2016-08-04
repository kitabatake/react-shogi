import React from 'react';
import Koma from './koma.js'

class Kyousya extends Koma {

  getNormaMovement() {
    // var num = this.owner.name == 'sente'?
    //   this.position.y : 8 - this.position.y
    // var dx = [], dy = []
    // for(let i = 0; i < num; i++) {
    //   dx.push(0)
    //   dy.push(i * -1 - 1)
    // }

    // return {
    //   num: num,
    //   dx: dx,
    //   dy: dy
    // }

    return {
      goOn: {
        num: 1,
        dx: [0],
        dy: [-1]
      }
    }
  }

  getNarigomaMovement() {
    return {
      normal: {
        num: 6,
        dx: [-1, 0, 1, -1, 1, 0],
        dy: [-1, -1, -1, 0, 0, 1]
      }
    }
  }

  _render() {
    return this.narigoma? '金' : '香'
  }

}
export default Kyousya