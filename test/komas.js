import expect from 'expect.js'
import Komas from '../komas.js'
import {Hu, Kyousya, Ou, Kin} from '../komas/index.js'
import Player from '../player'

function getHu(x, y, ownerName = 'sente') {
  return new Hu({
    position: {x: x, y: y},
    owner: new Player(ownerName)
  })
}

function getKyousya(x, y, ownerName = 'sente') {
  return new Kyousya({
    position: {x: x, y: y},
    owner: new Player(ownerName)
  })
}

describe('Komas#canMoveKoma', () => {

  it('is normal case', () => {
    var komas = new Komas()
    var hu = getHu(0, 1)
    expect(komas.canMoveKoma(hu, 0, 0)).to.be(true)
    expect(komas.canMoveKoma(hu, 0, 1)).to.be(false)
  })
})

describe('Komas#getOriginalMovablePositions', () => {
  it('is hu movable positions', () => {
    var komas = new Komas()
    var positions = komas.getOriginalMovablePositions(getHu(3, 3))
    expect(positions.length).to.be(1)
    expect(positions[0].x).to.be(3)
    expect(positions[0].y).to.be(2)
  })

  it('is gote movable positions', () => {
    var komas = new Komas()
    var positions = komas.getOriginalMovablePositions(getHu(3, 3, 'gote'))
    expect(positions.length).to.be(1)
    expect(positions[0].x).to.be(3)
    expect(positions[0].y).to.be(4)
  })

  it('is narigoma movable positions', () => {
    var komas = new Komas()
    var hu = getHu(3,3)
    hu.naru()

    var positions = komas.getOriginalMovablePositions(hu)
    expect(positions.length).to.be(6)
  })

  it('go on movable(Kyousya) positions', () => {
    var komas = new Komas()
    var kyousya = getKyousya(0, 8)
    var positions = komas.getOriginalMovablePositions(kyousya)
    expect(positions.length).to.be(8)

    var expectY = 7
    positions.forEach(position => {
      expect(position.x).to.be(0)
      expect(position.y).to.be(expectY)
      expectY--
    })
  })

  it('go on movable with obstacle', () => {
    var komas = new Komas()
    var hu = getHu(0, 5)
    komas.addKoma(hu)

    var kyousya = getKyousya(0, 8)
    var positions = komas.getOriginalMovablePositions(kyousya)
    expect(positions.length).to.be(2)
    expect(positions[0].y).to.be(7)
    expect(positions[1].y).to.be(6)

    hu.owner.name = 'gote'
    var positions = komas.getOriginalMovablePositions(kyousya)
    expect(positions.length).to.be(3)
  })
})

describe('Komas#getMovablePositions', () => {
  it('is empty komas case', () => {
    var komas = new Komas()
    var positions = komas.getMovablePositions(getHu(3, 3))
    expect(positions.length).to.be(1)
    expect(positions[0].x).to.be(3)
    expect(positions[0].y).to.be(2)
  })

  it('is overlap ally komas case', () => {
    var komas = new Komas()
    komas.addKoma(getHu(3, 2))
    var positions = komas.getMovablePositions(getHu(3, 3))
    expect(positions.length).to.be(0)
  })

  it('is utsu situation', () => {
    var komas = new Komas()
    var positions = komas.getMovablePositions(new Hu({
      position: null,
      owner: {name: 'sente'}
    }))

    expect(positions.length).to.be(81 - 9)

    komas.addKoma(getHu(3, 2))
    komas.addKoma(getHu(3, 3, 'gote'))
    positions = komas.getMovablePositions(new Hu({
      position: null,
      owner: new Player('sente')
    }))
    expect(positions.length).to.be(81 - 9 - 2)
  })
})

describe('Komas#getKomaByPosition', () => {
  it('is common case', () => {
    var komas = new Komas()
    expect(komas.getKomaByPosition(1, 1)).to.be(null)

    var hu = getHu(1, 1)
    komas.addKoma(hu)
    expect(komas.getKomaByPosition(1, 1)).to.be(hu)
  })
})

describe('Komas#toreruKoma', () => {
  it('is common case', () => {
    var komas = new Komas()
    var sente = new Player('sente')

    expect(komas.toreruKoma(0, 0, sente)).to.be(null)

    var goteHu = getHu(0, 0, 'gote')
    komas.addKoma(goteHu)
    expect(komas.toreruKoma(0, 0, sente)).to.be(goteHu)

    var senteHu = getHu(0, 1, 'sente')
    komas.addKoma(goteHu)
    expect(komas.toreruKoma(0, 1, sente)).to.be(null)
  })
})

describe('Komas#isForciblyNaru', () => {
  it('is true case ', () => {
    var komas = new Komas()
    var hu = getHu(0, 1)
    hu.move(0, 0)
    expect(komas.isForciblyNaru(hu)).to.be(true)
  })

  it('is false case ', () => {
    var komas = new Komas()
    var hu = getHu(0, 3)
    hu.move(0, 2)
    expect(komas.isForciblyNaru(hu)).to.be(false)
  })
})

describe('Komas#tsumi', () => {
  it('is tsumu case', () => {
    var komas = new Komas()
    var sente = new Player('sente')
    var gote = new Player('gote')

    var ou = new Ou({
      position: {x:0, y:0},
      owner: gote
    })
    komas.addKoma(ou)

    komas.addKoma(new Kin({
      position: {x: 0, y: 1},
      owner: sente
    }))
    komas.addKoma(new Hu({
      position: {x: 0, y: 2},
      owner: sente
    }))

    expect(komas.tsumi(ou)).to.be(true)
  })

  it('is tsumanai case', () => {
    var komas = new Komas()
    var sente = new Player('sente')
    var gote = new Player('gote')
    
    var ou = new Ou({
      position: {x:0, y:0},
      owner: gote
    })
    komas.addKoma(ou)

    komas.addKoma(new Kin({
      position: {x: 0, y: 1},
      owner: sente
    }))

    expect(komas.tsumi(ou)).to.be(false)
  })
})