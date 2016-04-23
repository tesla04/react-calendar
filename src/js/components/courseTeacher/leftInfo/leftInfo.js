"use strict";

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import * as componentHelper from '../../helper';

import './styles.css';

export default class LeftInfo extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  _eachTr(label, data){
    return(
      <tr key={label} className="tr-space">
        <td className="all-label all-label-align">{label}:</td>
        <td className="coursed-data">
          {componentHelper.renderHtml(data)}
        </td>
      </tr>
    );
  }

  _getTrList(data){
    let trList = [];
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
        let value = data[property];
        if(value) {
          trList.push(this._eachTr(property, value));
        }
      }
    }
    return trList
  }

  // description: teacher.course.description
  // price: teacher.course.price
  // let courseType = teacher.course.courseType;

  _getLink(label, url){
    //return '<a className="link-url" href="'+ url + '">' + label + '</a>';
    let link = null;
    if(url) {
      link = <a className="link-url" href={url}>{label}</a>
    }
    return link;
  }

  _getData(course, teacher){
    if(course && teacher){
      let link = this._getLink(teacher.schoolName, teacher.schoolUrl);
      if(link){
        link = ReactDOMServer.renderToString(link);
      }
      return {
        Cours : course.name + ' avec ' + teacher.firstName + ' ' + teacher.lastName,
        Type: teacher.course.courseType,
        Tel: teacher.tel,
        Lien: link,
        Note: teacher.course.note
      }
    }
    return null;
  }

  render(){
    let {course, teacher} = this.props;
    let data = this._getData(course, teacher);
    return (
      <div className="col-sm-4">
        <table>
          <tbody>
            {this._getTrList(data)}
          </tbody>
        </table>
      </div>
    );
  }
}

