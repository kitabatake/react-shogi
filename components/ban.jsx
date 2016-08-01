import React from 'react';
import KomaComponent from './koma.jsx'

var Ban = React.createClass({
  getGrids: function() {
    var trs = []
    for (let rows = 0; rows < 9; rows++) {
      var tds = []
      for (let cols = 0; cols < 9; cols++) {
        tds.push(this.getCell(cols, rows))
      }

      trs[rows] = <tr key={rows}>{tds}</tr>
    }
    return trs
  },
  handleCellClick: function() {
    return () => {
      console.log('cell click!')
    }
  },
  getCell: function(cols, rows) {
    var koma = this.props.komaGrids[cols][rows]
    var komaComponent = koma? <KomaComponent koma={koma} /> : ''
    return <td className='' key={cols} onClick={this.handleCellClick(koma, cols, rows)}>
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