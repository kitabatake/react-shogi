import React from 'react';
import Ban from './ban.jsx'
import Komadai from './komadai.jsx'
import Koma from '../komas/koma.js'

const App = React.createClass({
  render: function() {
    return (
      <div>
        <Ban 
          komaGrids={this.props.banKomas} 
          selectedKoma={this.props.selectedKoma}
          selectedKomaMovablePositions={this.props.selectedKomaMovablePositions} />
        <Komadai className='sente_komadai' komas={this.props.komadaiKomas.sente} />
        <Komadai className='gote_komadai' komas={this.props.komadaiKomas.gote} />
      </div>
    )
  }
})

export default App
