"use strict";

import React from 'react';

import moment from 'moment';
import * as componentHelper       from '../../helper';
import CheckBoxDates                   from './checkBoxDates/checkBoxDates';
import TextForm                   from './textForm';



export default class FreeDays extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkBoxDatesKey: 1
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    // force to reset the CheckBoxDates if the props of selectedDates is empty
    // so that can unckeck the selected checkBox with the default value of uncheck.
    if(nextProps.selectedDates && nextProps.selectedDates.length == 0){
      let newKey = this.state.checkBoxDatesKey + 1;
      this.setState({
        checkBoxDatesKey: newKey
      });
    }
  }


  _getSelectedList(selectedDates){
    let SelectedDates = selectedDates.map((selectedDate, index) =>{
      return(<li key={index}>{selectedDate}</li>);
    });
    return SelectedDates;
  }

  render(){

    return (
      <span>
        <CheckBoxDates
          key={this.state.checkBoxDatesKey}
          days={this.props.freeDays}
          {...this.props}
        />
        {this.props.msg}
        <ul>
          {this._getSelectedList(this.props.selectedDates)}
        </ul>


        <TextForm/>
      </span>
    );
  }
}


            
