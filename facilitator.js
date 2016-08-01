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
    this.state = 'waitSelect'
    this.teban = 'sente'
  }

  activePlayer() {
    return this.players[this.teban]
  }

  setStore(store) {
    this.store = store
  }

  update() {
    this.store.updateState(this.players.sente.komas, this.selectedKoma)
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

  moveKoma(x, y) {
    if (!this.canMoveKoma(x, y)) return
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
    }).then(
      (naru) => {
        if (naru) {
          this.selectedKoma.naru()
        }
        this.selectedKoma = null
        this.state = 'waitSelect'
        this.update()
      }
    )
  }

  canMoveKoma(x, y) {
    var flag = true
    this.activePlayer().komas.forEach(koma => {
      if (koma.position.x == x && koma.position.y == y) flag = false
    })
    return flag
  }

  getKomaByGrid(x, y) {
    var koma
    for(let teban in this.players) {
      let player = this.players[teban]
      player.komas.forEach(k => {
        if (k.position.x == x && k.position.y == y) koma = k
      })
    }
    return koma
  }
}

var facilitator = new Facilitator()

export default facilitator