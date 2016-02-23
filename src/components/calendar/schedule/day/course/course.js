"use strict";

var React = require('react');
var Logo = require('../../../logo/logo')


var Course = React.createClass({

  propTypes: {
    link: React.PropTypes.string.isRequired,
    logoName: React.PropTypes.string.isRequired,
    startHour: React.PropTypes.string.isRequired,
    endHour: React.PropTypes.string.isRequired,
    professorName: React.PropTypes.string.isRequired,
  },

  render: function(){
    console.log('this.props.logoName', this.props.logoName);
    return (
      <a className="cal" href="{this.props.link}">
        <div>
          <Logo logoName={this.props.logoName} logos={this.props.logos} />
          <br />&nbsp;
          {this.props.startHour}-<br />
          {this.props.endHour}<br />
          {this.props.professorName}
        </div>
      </a>
    );
  }
});

module.exports = Course;
