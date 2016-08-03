
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
      if (k.owner.name != activePlayer.name && k.samePosition(x, y)) koma = k
    })
    return koma
  }

  toruKoma(koma, player) {
    koma.position = null
    koma.owner = player
  }

}

export default Komas