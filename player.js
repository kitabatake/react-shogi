import {Hu} from './komas/index.js'

class Player {
  constructor(name) {
    this.name = name
    this.komas = []
    this.selectedKoma = null
  }

  initKomas() {
    this.komas.push(new Hu({
      position: {x: 2, y: 1},
      owner: this
    }))
  }
}

export default Player