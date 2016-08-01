import React from 'react';
import Ban from './ban.jsx'
// import Komadai from './komadai.jsx'
import Koma from '../komas/koma.js'

function init_koma_grids() {
  var grids = []
  for (let i = 0; i < 9; i++) {
    grids[i] = []
    for (let j = 0; j < 9; j++)
      grids[i][j] = null
  }

  grids[0][3] = new Koma()
  return grids
}

const App = React.createClass({
  render: function() {
    return (
      <div>
        <Ban koma_grids={init_koma_grids()}/>
      </div>
    )
  }
})

export default App