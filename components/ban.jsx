import React from 'react';
import KomaComponent from './koma.jsx'
import eventProcessor from '../event_processor.js'

var Ban = React.createClass({
  getGrids: function() {
    var trs = []
    for (let y = 0; y < 9; y++) {
      var tds = []
      for (let x = 0; x < 9; x++) {
        tds.push(this.getCell(x, y))
      }

      trs[y] = <tr key={y}>{tds}</tr>
    }
    return trs
  },
  handleCellClick: function(x, y) {
    return () => {
      eventProcessor.clickCell(x, y)
    }
  },
  getCellClassName: function(x, y) {
    var classNames = []
    if (this.props.selectedKoma) {
      this.props.selectedKomaMovablePositions.forEach(position => {
        if (position.x == x && position.y == y) classNames.push('movable')
      })
    }

    return classNames.join(' ')
  },
  getCell: function(x, y) {
    var koma = this.props.komaGrids[y][x]
    var komaComponent = koma? <KomaComponent koma={koma} /> : ''
    return <td className={this.getCellClassName(x, y)} key={x} onClick={this.handleCellClick(x, y)}>
      {komaComponent}
    </td>
  },
  render: function() {
    return(
      <table id='ban'>
        <tbody>
          {this.getGrids()}
        </tbody>
      </table>
    )
  }
})


export default Ban