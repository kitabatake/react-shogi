import expect from 'expect.js'
import Komas from '../komas.js'
import {Hu} from '../komas/index.js'
import Player from '../player'

function getHu(x, y, ownerName = 'sente') {
  return new Hu({
    position: {x: x, y: y},
    owner: new Player(ownerName)
  })
}

describe('canMoveKoma', () => {

  it('is normal case', () => {
    var komas = new Komas()
    var hu = getHu(0, 1)
    expect(komas.canMoveKoma(hu, 0, 0)).to.be(true)
    expect(komas.canMoveKoma(hu, 0, 1)).to.be(false)
  })
})

describe('getMovablePositions', () => {
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

    expect(positions.length).to.be(81)

    komas.addKoma(getHu(3, 2))
    komas.addKoma(getHu(3, 3, 'gote'))
    positions = komas.getMovablePositions(new Hu({
      position: null,
      owner: new Player('sente')
    }))
    expect(positions.length).to.be(79)
  })
})

describe('getKomaByPosition', () => {
  it('is common case', () => {
    var komas = new Komas()
    expect(komas.getKomaByPosition(1, 1)).to.be(null)

    var hu = getHu(1, 1)
    komas.addKoma(hu)
    expect(komas.getKomaByPosition(1, 1)).to.be(hu)
  })
})

describe('toreruKoma', () => {
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