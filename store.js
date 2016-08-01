 
 class Store {

  constructor() {
    this.state = this.createState()
    this.subscribes = []
  }

  subscribe(fn) {
    this.subscribes.push(fn)
  }

  updateState(komas = []) {
    this.state = this.createState(komas)
    for(let fn of this.subscribes) {
      fn(this.state)
    }
  }

  createState(komas = []) {
    return {
      banKomas: this.banKomasState(komas),
      komadaiKomas: this.komadaiKomasState(komas)
    }
  }

  banKomasState(komas) {
    var grids = []
    for (let i = 0; i < 9; i++) {
      grids[i] = []
      for (let j = 0; j < 9; j++)
        grids[i][j] = null
    }
    for (let koma of komas) grids[koma.position.y][koma.position.x] = koma

    return grids
  }

  komadaiKomasState() {
    return []
  }
 }

 export default new Store()