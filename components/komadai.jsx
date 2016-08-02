import React from 'react';
import KomaComponent from './koma.jsx'

var Komadai = React.createClass({
  handleKomaClick: function(koma) {
    return () => {
      if (koma.owner == this.props.teban)
      this.props.selectKoma(koma)
    }
  },
  renderKomas: function() {
    var komas = []
    this.props.komas.forEach(koma => {
      komas.push(
        <KomaComponent
          key={koma.id}
          koma={koma} />
      )
    })
    return komas
  },
  render: function() {
    return <div>{this.renderKomas()}</div>
  }
})

export default Komadai