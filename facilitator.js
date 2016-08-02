import React from 'react'
import ReactDOM from 'react-dom'
import Koma from './komas/koma.js'
import Player from './player.js'

class Facilitator {

  constructor() {
    this.players = {}
    this.teban = ''
    this.view = null
    this.state = ''
  }

  init() {
    this.players = {
      sente: new Player('sente'),
      gote: new Player('gote')
    }

    this.players.sente.initKomas()
    this.players.gote.initKomas()
    this.state = 'waitSelect'
    this.teban = 'sente'
  }

  activePlayer() {
    return this.players[this.teban]
  }

  inactivePlayer() {
    return this.players[this.teban == 'sente'? 'gote' : 'sente']
  }

  setStore(store) {
    this.store = store
  }

  update() {
    var selectedKomaMovablePositions = this.selectedKoma? this.getMovablePositions(this.selectedKoma) : []
    this.store.updateState(
      this.players.sente.komas.concat(this.players.gote.komas), 
      this.selectedKoma,
      selectedKomaMovablePositions
    )
  }

  waitSelect() {
    this.state = 'waitSelect'
    this.selectedKoma = null
  }

  selectKoma(koma) {
    this.state = 'waitMove'
    this.selectedKoma = koma
    this.update()
  }

  cancelSelectedKoma() {
    this.selectedKoma = null
    this.update()
  }

  turnChange() {
    this.teban = this.teban == 'sente'? 'gote' : 'sente'
  }

  moveKoma(x, y) {
    if (!this.canMoveKoma(this.selectedKoma, x, y)) {
      this.waitSelect()
      this.update()
      return
    }
    this.selectedKoma.move(x, y)

    var promise = new Promise((resolve, reject) => {
      if (!this.selectedKoma.canNareru()) {
        resolve(false)
        return
      }
      if (window.confirm('成りますか?')) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }).then(naru => this.movedKoma(naru))
  }

  movedKoma(naru) {
    if (naru) {
      this.selectedKoma.naru()
    }

    var toreruKoma = this.toreruKoma(this.selectedKoma.position.x, this.selectedKoma.position.y)
    if (toreruKoma) {
      this.toruKoma(toreruKoma)
    }

    this.selectedKoma = null
    this.state = 'waitSelect'
    this.turnChange()
    this.update()
  }

  toruKoma(koma) {
    koma.position = null
    koma.owner = this.activePlayer()
    this.activePlayer().komas.push(koma)
    this.inactivePlayer().komas = this.inactivePlayer().komas.filter(k => k != koma)
  }

  toreruKoma(x, y) {
    var koma
    this.inactivePlayer().komas.forEach(k => {
      if (k.samePosition(x, y)) koma = k
    })
    return koma
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
      this.activePlayer().komas.forEach(k => {
        if (k.samePosition(position.x, position.y)) movable = false
      })
      return movable
    })

    // 駒台の駒は敵の駒の上に移動できない
    if (!koma.isBanjyou()) {
      positions = positions.filter(position => {
        var movable = true
        this.inactivePlayer().komas.forEach(k => {
          if (k.samePosition(position.x, position.y)) movable = false
        })
        return movable
      })
    }

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

  getKomaByGrid(x, y) {
    var koma
    for(let teban in this.players) {
      let player = this.players[teban]
      player.komas.forEach(k => {
        if (k.samePosition(x, y)) koma = k
      })
    }
    return koma
  }
}

var facilitator = new Facilitator()

export default facilitator