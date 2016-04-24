"use strict";
import React                      from "react";

import moment                     from "moment";

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false
    };
  }

  handleChange(e) {
    const value = e.target.checked;
    this.props.changeValue(this.props.name, value);
  }

  _getDayNumber(date){
    console.log('_getDayNumber', date)
    return moment( date ).utcOffset("+00:00").get('date');
  }
  // <input id={name} class="reservation-checkbox" name="selectedDays" type="checkbox" value={name} />
  render(){
    let {name} = this.props;
    console.log('name', name)
    let dayNumber = this._getDayNumber(name);
    return (
      <td class="text-center reservation-day">
        <label className="reservation-label" for={name}> 
          {dayNumber}
        </label>
        
        <input type="checkbox"
          id={name}
          name={this.props.name}
          className="reservation-checkbox"
          checked={this.props.checked}
          ref={this.props.name}
          value={this.props.value} 
          onChange={(e) => {this.handleChange(e);} }
        />
        <label className="reservation-label" for={name}>
        </label>
      </td>
    );
  }
}

            