import React from 'react';

var KomaComponent = React.createClass({
  handleClick: function() {
    return (e) => {
      console.log('koma click!')
      e.stopPropagation()
    }
  },
  render: function() {
     var className = this.props.koma.owner.name + '_koma'
    return(
      <div className={className}>
        {this.props.koma.render()}
      </div>
    )
  }
})


export default KomaComponent