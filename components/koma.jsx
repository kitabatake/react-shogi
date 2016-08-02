import React from 'react';
import event from '../event_processor.js'

var KomaComponent = React.createClass({
  handleClick: function() {
    return () => {
      if (!this.props.koma.isBanjyou()) {
        event.clickMotigoma(this.props.koma)
      }
    }
  },
  render: function() {
     var className = this.props.koma.owner.name + '_koma'
    return(
      <div 
        onClick={this.handleClick()}
        className={className}>
        {this.props.koma.render()}
      </div>
    )
  }
})


export default KomaComponent