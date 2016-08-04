import {Hu, Kyousya, Keima, Gin, Kin, Ou, Hisya, Kaku} from './komas/index.js'

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
      positions = this.getUtsuMovablePositions(koma)
    }
    else {
      positions = this.getOriginalMovablePositions(koma)
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

  getOriginalMovablePositions(koma) {
    var positions = []
    var movement = koma.getMovement()
    if (movement.normal) {
      positions.push(... this.getOriginalNormalMovablePositions(movement.normal, koma.position))
    }
    if (movement.goOn) {
      positions.push(... this.getOriginalGoOnMovablePositions(movement.goOn, koma.position, koma.owner))
    }
    return positions
  }

  getOriginalNormalMovablePositions(movement, position) {
    var positions = []
    for (var i = 0; i < movement.num; i++) {
      let dx = position.x + movement.dx[i]
      let dy = position.y + movement.dy[i]
      if (this.onBan(dx, dy)) {
        positions.push({
          x: dx,
          y: dy
        })
      }
    }
    return positions
  }

  getOriginalGoOnMovablePositions(movement, position, owner) {
    var positions = []
    for (let i = 0; i < movement.num; i++) {
      let goOnNum = 1
      while(true) {
        var p = {
          x: position.x + (movement.dx[i] * goOnNum),
          y: position.y + (movement.dy[i] * goOnNum)
        }

        if (!this.onBan(p.x, p.y)) break

        let obstacleKoma = this.getKomaByPosition(p.x, p.y)
        if (obstacleKoma) {
          if (!obstacleKoma.owner.equals(owner)) {
            positions.push(p)
          }
          break
        }
        positions.push(p)
        goOnNum++
      }
    }

    return positions
  }

  onBan(x, y) {
    return x >= 0 && x <= 8 && y >= 0 && y <= 8
  }

  getOriginalMovablePositionsIfPositionIs(x, y, koma) {
    var originalPosition = Object.assign(null, koma.position)
    koma.position = {x: x, y: y}
    var target = this.getOriginalMovablePositions(koma)
    koma.position = originalPosition
    return target
  }

  getUtsuMovablePositions(koma) {
    var positions = this.allPositions().filter(position => {
      koma.position = position
      let assumedPostions = this.getOriginalMovablePositions(koma)
      return assumedPostions.length > 0
    })
    koma.position = null
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

  isForciblyNaru(koma) {
    var mp = this.getOriginalMovablePositions(koma)
    return !koma.narigoma && mp.length == 0
  }

  toruKoma(koma, player) {
    koma.position = null
    koma.owner = player
  }

  tsumi(ou) {
    var movableGrids = []
    for (let y = 0; y < 9; y++) {
      movableGrids[y] = []
      for (let x = 0; x < 9; x++) movableGrids[y][x] = true
    }

    this.komas.forEach(koma => {
      if (!koma.isBanjyou()) return
      if (koma.sameOwner(ou)) {
        movableGrids[koma.position.y][koma.position.x] = false
      }
      else {
        let positions = this.getOriginalMovablePositions(koma)
        positions.forEach(position => {
          movableGrids[position.y][position.x] = false
        })
      }
    })

    var movableCount = 0
    this.getOriginalMovablePositions(ou).forEach(position => {
      if (movableGrids[position.y][position.x])
        movableCount++
    })
    return movableCount == 0
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

    this.komas.push(new Hisya({
      position: {x: 7, y: 7},
      owner: sente
    }))
    this.komas.push(new Kaku({
      position: {x: 1, y: 7},
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

    var senteOu = new Ou({
      position: {x: 4, y: 8},
      owner: sente
    })
    this.komas.push(senteOu)

    var goteOu = new Ou({
      position: {x: 4, y: 0},
      owner: gote
    })
    this.komas.push(goteOu)

    return {
      sente: senteOu,
      gote: goteOu
    }
  }

}

export default Komas