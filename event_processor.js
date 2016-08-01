import facilitator from './facilitator.js'

class EventProcessor {
  clickCell(x, y) {
    switch(facilitator.state) {
      case 'waitSelect':
        this.waitSelectProcess(x, y)
        break
      case 'waitMove':
        this.waitMoveProcess(x, y)
        break
    }
  }

  waitSelectProcess(x, y) {
    var koma = facilitator.getKomaByGrid(x, y)
    if (koma && koma.owner === facilitator.activePlayer()) {
      facilitator.selectKoma(koma)
    }
  }

  waitMoveProcess(x, y) {
    facilitator.moveKoma(x, y)
  }
}

export default new EventProcessor()