class Player {

  constructor(name) {
    this.name = name
    this.ou = null
  }

  setOu(ou) {
    this.ou = ou
  }

  equals(player) {
    return this.name == player.name
  }
}

export default Player