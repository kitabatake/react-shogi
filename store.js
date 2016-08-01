 
 class Store {

  constructor() {
    this.state = this.createState()
    this.subscribes = []
  }

  subscribe(fn) {
    this.subscribes.push(fn)
  }

  updateState(komas = [], selectedKoma = null) {
    this.state = this.createState(komas, selectedKoma)
    for(let fn of this.subscribes) {
      fn(this.state)
    }
  }

  createState(komas = [], selectedKoma = null) {
    return {
      banKomas: this.banKomasState(komas),
      komadaiKomas: this.komadaiKomasState(komas),
      selectedKoma: selectedKoma
    }
  }

  banKomasState(komas) {
    var grids = []
    for (let i = 0; i < 9; i++) {
      grids[i] = []
      for (let j = 0; j < 9; j++)
        grids[i][j] = null
    }
    for (let koma of komas) {
      if (!koma.isBanjyou()) continue
      grids[koma.position.y][koma.position.x] = koma
    }

    return grids
  }

  komadaiKomasState(komas) {
    var komadaiKomas = {
      sente: [],
      gote: []
    }
    komas.forEach(koma => {
      if (koma.isBanjyou()) return
      komadaiKomas[koma.owner.name].push(koma)
    })

    return komadaiKomas
  }
 }

 export default new Store()