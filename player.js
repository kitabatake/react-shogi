import {Hu, Kyousya, Keima, Gin, Kin, Ou} from './komas/index.js'

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

    this.komas.push(new Kyousya({
      position: {x: 0, y: 8},
      owner: this
    }))
    this.komas.push(new Keima({
      position: {x: 1, y: 8},
      owner: this
    }))
    this.komas.push(new Gin({
      position: {x: 2, y: 8},
      owner: this
    }))
    this.komas.push(new Kin({
      position: {x: 3, y: 8},
      owner: this
    }))
    this.komas.push(new Ou({
      position: {x: 4, y: 8},
      owner: this
    }))
    this.komas.push(new Kin({
      position: {x: 5, y: 8},
      owner: this
    }))
    this.komas.push(new Gin({
      position: {x: 6, y: 8},
      owner: this
    }))
    this.komas.push(new Keima({
      position: {x: 7, y: 8},
      owner: this
    }))
    this.komas.push(new Kyousya({
      position: {x: 8, y: 8},
      owner: this
    }))

    for (let i = 0; i < 9; i ++) {
      this.komas.push(new Hu({
        position: {x: i, y: 6},
        owner: this
      }))
    }
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
    this.komas.push(new Kyousya({
      position: {x: 7, y: 1},
      owner: this
    }))
    this.komas.push(new Keima({
      position: {x: 1, y: 0},
      owner: this
    }))
  }
}

export default Player