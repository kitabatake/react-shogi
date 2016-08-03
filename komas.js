import {Hu, Kyousya, Keima, Gin, Kin, Ou} from './komas/index.js'

class Komas {

  constructor() {
    this.komas = []
  }

  addKoma(koma) {
    this.komas.push(koma)
  }

  getMovablePositions(koma) {
    var positions
    if (!koma.isBanjyou()) {
      positions = this.allPositions()
    }
    else {
      positions = koma.getMovablePositions()
    }

    positions = positions.filter(position => {
      var movable = true
      this.komas.forEach(k => {
        if (koma.sameOwner(k) && k.samePosition(position.x, position.y)) movable = false
        // 駒台の駒は敵の駒の上に移動できない
        if (!koma.isBanjyou()
          && k.samePosition(position.x, position.y))
          movable = false
      })
      return movable
    })

    return positions
  }

  allPositions() {
    var positions = []
    for (let y = 0; y < 9; y++) for(let x = 0; x < 9; x++) positions.push({x:x, y:y})
    return positions
  }

  canMoveKoma(koma, x, y) {
    var flag = false
    this.getMovablePositions(koma).forEach(position => {
      if (position.x == x && position.y == y) flag = true
    })
    return flag
  }

  getKomaByPosition(x, y) {
    var koma = null
    this.komas.forEach(k => {
      if (k.samePosition(x, y)) koma = k
    })
    return koma
  }

  toreruKoma(x, y, activePlayer) {
    var koma = null
    this.komas.forEach(k => {
      if (!k.owner.equals(activePlayer) && k.samePosition(x, y)) koma = k
    })
    return koma
  }

  toruKoma(koma, player) {
    koma.position = null
    koma.owner = player
  }

  initKomas(sente, gote) {
    this.komas.push(new Kyousya({
      position: {x: 0, y: 8},
      owner: sente
    }))
    this.komas.push(new Keima({
      position: {x: 1, y: 8},
      owner: sente
    }))
    this.komas.push(new Gin({
      position: {x: 2, y: 8},
      owner: sente
    }))
    this.komas.push(new Kin({
      position: {x: 3, y: 8},
      owner: sente
    }))
    this.komas.push(new Ou({
      position: {x: 4, y: 8},
      owner: sente
    }))
    this.komas.push(new Kin({
      position: {x: 5, y: 8},
      owner: sente
    }))
    this.komas.push(new Gin({
      position: {x: 6, y: 8},
      owner: sente
    }))
    this.komas.push(new Keima({
      position: {x: 7, y: 8},
      owner: sente
    }))
    this.komas.push(new Kyousya({
      position: {x: 8, y: 8},
      owner: sente
    }))

    for (let i = 0; i < 9; i ++) {
      this.komas.push(new Hu({
        position: {x: i, y: 6},
        owner: sente
      }))
    }


    this.komas.push(new Kyousya({
      position: {x: 0, y: 0},
      owner: gote
    }))
    this.komas.push(new Keima({
      position: {x: 1, y: 0},
      owner: gote
    }))
    this.komas.push(new Gin({
      position: {x: 2, y: 0},
      owner: gote
    }))
    this.komas.push(new Kin({
      position: {x: 3, y: 0},
      owner: gote
    }))
    this.komas.push(new Ou({
      position: {x: 4, y: 0},
      owner: gote
    }))
    this.komas.push(new Kin({
      position: {x: 5, y: 0},
      owner: gote
    }))
    this.komas.push(new Gin({
      position: {x: 6, y: 0},
      owner: gote
    }))
    this.komas.push(new Keima({
      position: {x: 7, y: 0},
      owner: gote
    }))
    this.komas.push(new Kyousya({
      position: {x: 8, y: 0},
      owner: gote
    }))

    for (let i = 0; i < 9; i ++) {
      this.komas.push(new Hu({
        position: {x: i, y: 2},
        owner: gote
      }))
    }
  }

}

export default Komas