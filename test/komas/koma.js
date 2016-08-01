import expect from 'expect.js'
import Koma from '../../komas/koma.js'

const reset = () => {
  Koma.reset()
}

const createKoma = (x = 0, y = 0, owner = 'sente') => {
  var koma = new Koma({
    position: {x, y},
    owner: {name: owner}
  })
  koma.narigomaMovement = {}
  return koma
}

describe('Koma#constructor', () => {
  it('sets positions and owner', () => {
    var koma = createKoma(1, 2, 'sente')
    expect(koma.position.x).to.be(1)
    expect(koma.position.y).to.be(2)
    expect(koma.owner.name).to.be('sente')
  })
})

describe('Koma#move', () => {
  it('should be set spefified position', () => {
    reset()
    var koma = createKoma(1, 2, 'sente')
    koma.move(3, 5)
    expect(koma.position.x).to.be(3)
    expect(koma.position.y).to.be(5)
  })
})

describe('Koma#canNareru', () => {
  beforeEach(() => {
    reset()
  })

  it('is narenai situations', () => {
    var koma = createKoma(5, 5, 'sente')
    koma.move(5, 4)
    expect(koma.canNareru()).to.be(false)
    koma.move(5, 3)
    expect(koma.canNareru()).to.be(false)

    koma = createKoma(5, 4, 'gote')
    koma.move(5, 5)
    expect(koma.canNareru()).to.be(false)

    // if koma already naru, canNareru() return false
    koma.naru()
    koma.move(5, 8)
    expect(koma.canNareru()).to.be(false)
  })

  it('is nareru situations', () => {
    var koma = createKoma(5, 3, 'sente')
    koma.move(5, 2)
    expect(koma.canNareru()).to.be(true)

    koma = createKoma(5, 2, 'sente')
    koma.move(4, 8)
    expect(koma.canNareru()).to.be(true)

    koma = createKoma(5, 3, 'gote')
    koma.move(3, 6)
    expect(koma.canNareru()).to.be(true)

  })
})

describe('Koma#getMovablePositions', () => {
  it('simulates hu movable positions', () => {
    var koma = createKoma(5, 3, 'sente')
    koma.getMovement = () => {
      return {
        num: 1,
        dx: [0],
        dy: [-1]
      }
    }

    var mps = koma.getMovablePositions()
    expect(mps.length).to.be(1)
    expect(mps[0].x).to.be(5)
    expect(mps[0].y).to.be(2)
  })

  it('is gote movable positions', () => {
    var koma = createKoma(5, 3, 'gote')
    koma.getMovement = () => {
      return {
        num: 1,
        dx: [0],
        dy: [-1]
      }
    }

    var mps = koma.getMovablePositions()
    expect(mps.length).to.be(1)
    expect(mps[0].x).to.be(5)
    expect(mps[0].y).to.be(4)
  })

  it('is narigoma movable positions', () => {
    var koma = createKoma(5, 3, 'sente')
    koma.getMovement = () => {
      return {
        num: 1,
        dx: [0],
        dy: [-1]
      }
    }
    koma.getNarigomaMovement = () => {
      return {
        num: 2,
        dx: [0, 1],
        dy: [-1, 1]
      }
    }

    koma.naru()

    var mps = koma.getMovablePositions()
    expect(mps.length).to.be(2)
    expect(mps[0].x).to.be(5)
    expect(mps[0].y).to.be(2)
    expect(mps[1].x).to.be(6)
    expect(mps[1].y).to.be(4)
  })
})