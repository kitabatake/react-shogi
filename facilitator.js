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

  processEvent(event) {
    switch(this.state) {
      case 'waitSelect':
        this.selectAction(action)
    }
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