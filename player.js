

class Player {

  constructor(name) {
    this.name = name
    this.komas = []
    this.selectedKoma = null
  }

  equals(player) {
    return this.name == player.name
  }
}

export default Player