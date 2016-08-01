import React from 'react';

var KomaComponent = React.createClass({
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