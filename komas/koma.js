
var next_id = 0

class Koma {

  static reset() {
    next_id = 0
  }

  static getId() {
    return next_id++
  }

  constructor(options = {
    position: null,
    owner: ''
  }) {
    this.id = Koma.getId()
    this.position = options.position
    this.previousPosition = null
    this.owner = options.owner
    this.narigoma = false
  }

  move(x, y) {
    this.previousPosition = Object.assign({}, this.position)
    this.position = {x:x, y:y}
  }

  canNareru() {
    if (this.narigoma) return false

    var targetPosition = this.normalizePosition(this.position)
    if (targetPosition.y < 3) return true

    // narukaeru
    targetPosition = this.normalizePosition(this.previousPosition)
    if (targetPosition.y < 3) return true

    return false
  }

  // Normalize position to sente's point of view. 
  normalizePosition(position) {
    if (this.owner.name == 'sente') return Object.assign({}, position)
    return {
      x: position.x,
      y: 8 - position.y
    }
  }

  isBanjyou() {
    return this.position != null
  }

  samePosition(x, y) {
    return this.isBanjyou() && this.position.x == x && this.position.y == y
  }

  sameOwner(koma) {
    return this.owner.equals(koma.owner)
  }

  naru() {
    this.narigoma = true
  }

  _render() {
    return ''
  }

  render() {
    return this._render()
  }

  normalizeMovement(movement) {
    if (this.owner.name == 'sente') return Object.assign({}, movement)
    return {
      num:movement.num,
      dx: movement.dx,
      dy: movement.dy.map(y => -y)
    }
  }

  getMovablePositions() {
    var positions = []
    var movement = this.narigoma? this.getNarigomaMovement() : this.getMovement()
    movement = this.normalizeMovement(movement)
    for (var i = 0; i < movement.num; i++) {
      positions.push({
        x: this.position.x + movement.dx[i], 
        y: this.position.y + movement.dy[i]})
    }

    return positions
  }
}

export default Koma