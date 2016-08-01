import React from 'react'
import ReactDOM from 'react-dom'
import Koma from './komas/koma.js'
import Player from './player.js'

class Facilitator {

  constructor() {
    this.players = {}
    this.teban = ''
    this.view = null
  }

  init() {
    this.players = {
      sente: new Player(),
      gote: new Player()
    }

    this.players.sente.initKomas()

    this.teban = 'sente'
  }

  activePlayer() {
    return this.players[this.teban]
  }

  setStore(store) {
    this.store = store
  }

  update() {
    this.store.updateState(this.players.sente.komas)
  }
}

export default new Facilitator()