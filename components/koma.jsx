import React from 'react';

var KomaComponent = React.createClass({
  handleClick: function() {
    return (e) => {
      console.log('koma click!')
      e.stopPropagation()
    }
  },
  render: function() {
    return(
      <div>
        {this.props.koma.render()}
      </div>
    )
  }
})


export default KomaComponent