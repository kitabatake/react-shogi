import Koma from './komas/koma.js'

class Player {
  constructor() {
    this.komas = []
    this.selectedKoma = null
  }

  initKomas() {
    this.komas.push(new Koma({
      position: {x: 2, y: 1}
    }))
  }
}

export default Player