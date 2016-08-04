

class Player {

  constructor(name) {
    this.name = name
  }

  equals(player) {
    return this.name == player.name
  }
}

export default Player