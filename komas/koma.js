
var next_id = 0

class Koma {

  static getId() {
    return next_id++
  }

  constructor(options = {
    position: null
  }) {
    this.id = Koma.getId()
    this.name = 'hoge'
    this.position = options.position
  }

  render() {
    return this.name
  }
}

export default Koma