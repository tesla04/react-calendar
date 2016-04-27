"use strict";

import React from 'react';

import moment from 'moment';

import * as componentHelper       from '../helper';
import Dropdown                   from '../common/dropdown/Dropdown';
import FreeDaysForm               from './forms/freeDays';
import TryingDaysForm               from './forms/tryingDays';
import OneOrManyDaysForm               from './forms/oneOrManyDays';

import './styles.scss';


export default class Reservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentForm: null,
      tryingDaysDates: [],
      oneOrManyDaysDates: [],
      freeDaysDates: []
    };
    console.log(
      componentHelper.getDayStartFromNow(moment('2016-04-19T23:49:19.838Z').utcOffset("+00:00")).toISOString()
    );
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.schedule){
      let schedule = nextProps.schedule;

      this.setState({
        list : [
          {title: "Un cour gratuit", form: 'FREE_DAYS'},
          {title: "Lundi du 2 mai au 5 avril 2016 (11 cours)", form: 'TEST'},
          {title: "Une ou plusieur journee de cours", form: 'ONE_OR_MANY_DAYS'},
          {title: "Un cour d'essaie", form: 'TRYING_DAYS'}
        ]
      });
    }
  }

  _getReservationHeader(course, teacher, courseType, schedule){

    let courseName = null;
    let courseTypeName = null;
    let fullName = null;
    let {hourStart, hourEnd} = componentHelper.getHourRange(schedule);
    let weekDayName = null;

    if(course && teacher && courseType && schedule){
      courseName = course.name;
      courseTypeName = courseType.name;
      fullName = componentHelper.getFullName(teacher)
      weekDayName = componentHelper.getWeekDayName(schedule.dayStart);
    }

    return(
      <span>
        Demande de réservation pour cours <strong>{courseName}, {courseTypeName} </strong>
        avec {fullName} le {weekDayName} de {hourStart} à {hourEnd}.
      </span>
    );
  }

  getName(item){
    return item.title;
  }

  getValue(){
    if(this.state.currentForm){
      return this.getName(this.state.currentForm);
    } else {
      return "Choisir une option de réservation ...";
    }
  }

  select(reservationType){
    this.setState({
      currentForm: reservationType,
      tryingDaysDates: [],
      oneOrManyDaysDates: []
    })
  }


  
  _removeItem(arr, item){
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice( index, 1 );
    }
    return arr;
  }

  _changeValueDates(stateVariableName, name, value){
    let stateVariable = this.state[stateVariableName]
    name = moment(name).format('LL');

    if(value == true){
      stateVariable.push(name);
    }else {
      stateVariable = this._removeItem(stateVariable, name);
    }

    this.setState({
      stateVariable : stateVariable
    });
  }

  changeValueFreeDays(name, value) {
    this._changeValueDates('freeDaysDates', name, value);
  }

  changeValueOneOrManyDays(name, value) {
    this._changeValueDates('oneOrManyDaysDates', name, value);
  }

  changeValueTryingDays(name, value) {
    this._changeValueDates('tryingDaysDates', name, value);
  }

  cancel(currentForm){
    console.log('reservation.cancel')
  }

  send(currentForm){
    console.log('reservation.cancel')
  }

  _getFreeDaysForm(schedule, selectedDates){

    let freeDays = schedule.freeDays.map((freeDay, index) =>{

      // TODO to remove whe fix the db
      if(! freeDay.day){
        console.log('! freeDay', freeDay._id)
        return moment('2016-01-11T16:15:00.000Z');
      }
        
      return freeDay.day;
    });

    return(
      <FreeDaysForm 
      freeDays={freeDays}
      selectedDates={selectedDates}
      msg="Un cour gratuit"
      cancel={() => { this.cancel('FREE_DAYS'); }}
      send={() => { this.send('FREE_DAYS'); }}
      changeValue = {(name, value) => { this.changeValueFreeDays(name, value); }}
      />
    );
  }

  _getOneOrManyDaysForm(schedule, selectedDates){
    return(
      <OneOrManyDaysForm 
      dayStart={schedule.dayStart}
      dayEnd={schedule.dayEnd}
      selectedDates={selectedDates}
      msg=" Une ou plusieurs journée(s) de cours"
      changeValue = {(name, value) => { this.changeValueOneOrManyDays(name, value); }}
      />
    );
  }

  _getTryingDaysForm(schedule, selectedDates){
    return(
      <TryingDaysForm 
      dayStart={schedule.dayStart}
      dayEnd={schedule.dayEnd}
      selectedDates={selectedDates}
      msg="Un cour d'essaie (gratuit)"
      changeValue = {(name, value) => { this.changeValueTryingDays(name, value); }}
      />
    );
  }


  render(){
    let {course, teacher, courseType, schedule} = this.props;
    let dateRange = componentHelper.getDateRange(schedule);

    let currentForm = null;
    if(this.state.currentForm){
      if(this.state.currentForm.form == 'TRYING_DAYS'){
        currentForm = this._getTryingDaysForm(schedule, this.state.tryingDaysDates)
      }else if(this.state.currentForm.form == 'ONE_OR_MANY_DAYS'){
        currentForm = this._getOneOrManyDaysForm(schedule, this.state.oneOrManyDaysDates)
      }else if(this.state.currentForm.form == 'FREE_DAYS'){
        currentForm = this._getFreeDaysForm(schedule, this.state.freeDaysDates)
      }
    }

    return (
      <div className="row">
        <div className="col-sm-6">
          <h3 className="text-center">Réservation</h3>
          <div className="reserv-cont-form">
            {this._getReservationHeader(course, teacher, courseType, schedule)}
            <Dropdown
              disabled={function(){}}
              list={this.state.list}
              onSelect={this.select.bind(this)}
              cbGetName={this.getName.bind(this)}
              cbGetValue={this.getValue.bind(this)}
            />
          </div>
          {currentForm}
        </div>
      </div>
    );
  }

}
