import facilitator from './facilitator.js'

class EventProcessor {
  clickCell(x, y) {
    switch(facilitator.state) {
      case 'waitSelect':
        this.waitSelectProcess(x, y)
    }
  }

  waitSelectProcess(x, y) {
    var koma = facilitator.getKomaByGrid(x, y)
    if (koma && koma.owner === facilitator.activePlayer()) {
      facilitator.selectKoma(koma)
    }
  }
}

export default new EventProcessor()