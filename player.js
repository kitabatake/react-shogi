import {Hu} from './komas/index.js'

class Player {
  constructor(name) {
    this.name = name
    this.komas = []
    this.selectedKoma = null
  }

  initKomas() {
    if (this.name == 'sente') this.initSenteKomas()
    else this.initGoteKomas()
  }

  initSenteKomas() {
    this.komas.push(new Hu({
      position: {x: 2, y: 4},
      owner: this
    }))
  }

  initGoteKomas() {
    this.komas.push(new Hu({
      position: {x: 2, y: 3},
      owner: this
    }))
    this.komas.push(new Hu({
      position: {x: 5, y: 3},
      owner: this
    }))
  }
}

export default Player