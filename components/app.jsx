import React from 'react';
import Ban from './ban.jsx'
import Komadai from './komadai.jsx'
import Koma from '../komas/koma.js'

function getDefaultBanKomas() {
  var grids = []
  for (let i = 0; i < 9; i++) {
    grids[i] = []
    for (let j = 0; j < 9; j++)
      grids[i][j] = null
  }
  return grids
}

const App = React.createClass({
  getInitialState: function() {
    return {
      banKomas: getDefaultBanKomas(),
      komadaiKomas: []
    }
  },
  updateState: function(state) {
    console.log(state)
  },
  render: function() {
    return (
      <div>
        <Ban komaGrids={this.props.banKomas}/>
        <Komadai komas={this.props.komadaiKomas} />
      </div>
    )
  }
})

export default App