import React from 'react'
import ReactDOM from 'react-dom'
import Koma from './komas/koma.js'
import Player from './player.js'
import Komas from './komas.js'

class Facilitator {

  constructor() {
    this.players = {}
    this.teban = ''
    this.view = null
    this.state = ''
    this.komas = new Komas()
  }

  init() {
    this.players = {
      sente: new Player('sente'),
      gote: new Player('gote')
    }

    this.komas.initKomas(this.players.sente, this.players.gote)
    this.waitSelect()
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
      this.komas.komas, 
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

      if (this.komas.isForciblyNaru(this.selectedKoma)) {
        resolve(true)
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
    this.komas.toruKoma(koma, this.activePlayer())
  }

  toreruKoma(x, y) {
    return this.komas.toreruKoma(x, y, this.activePlayer())
  }

  getMovablePositions(koma) {
    return this.komas.getMovablePositions(koma)
  }

  canMoveKoma(koma, x, y) {
    return this.komas.canMoveKoma(koma, x, y)
  }

  getKomaByPosition(x, y) {
    return this.komas.getKomaByPosition(x, y)
  }
}

var facilitator = new Facilitator()

export default facilitator