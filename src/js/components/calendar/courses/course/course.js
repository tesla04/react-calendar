"use strict";

import React from 'react';

import classNames from  'classnames'; 

import * as componentHelper from '../../../helper';



export default class Course extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      showTeachers: false
    };
    // bind the functions to this because is not Autobinding with class es6
  }

	showHideTeachers() {
		this.setState({showTeachers: !this.state.showTeachers});
	}

	getTeachers(){
		return '';
	}



  getRenderTeachers(course, classes){
    let teachers = course.teachers;

    var renderTeachers = teachers.map( function(teacher){
      let fullName = componentHelper.getFullName(teacher);
      let link = componentHelper.getLink(course, teacher);

    	return (
				<div key={teacher._id} className={classes}>
					<a href={link}>
						<div className="teacher-name">
							{fullName}
						</div>
					</a>
				</div>
			);

    });
    return renderTeachers;
  }

	_renderCourse() {

    let course = this.props.course;
    let name = course.name;
    let svg = course.svg;


	    var classes = classNames( this.props.className, {
	    	'teacher' : true,
	    	'teacher-transition' : true,
	        'teacher-show': ( this.state.showTeachers == true ),
	        'teacher-hide': ( this.state.showTeachers == false )
	    } );
		return (
			<div className="course">
	    	<div className="course-header" onClick={this.showHideTeachers.bind(this)}>
	    		<div className="course-header-name">
	    			{name}
	    		</div>
	    		<div className="course-header-icon">
	    			{componentHelper.renderHtml(svg)}
	    		</div>
	    	</div>

	    	<div className="teachers">
					{this.getRenderTeachers(course, classes)}
				</div>
			</div>
		);
	}

  render(){
    return this._renderCourse();
  }
}

