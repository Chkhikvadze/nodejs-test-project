import React, {Component} from 'react';
import * as actions from '../../actions/time';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import styles from './times.scss';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchReport();
  }

  renderTimes() {
    const times = this.props.times || [];

    return times.map((time, i) => {

      let notes = time.notes.map((note)=>{
        return note.note + ', '
      })
      return <tr key={time._id.date}>
        <td>{ time._id.date }</td>
        <td>{ time.totalTime }</td>
        <td>{ notes }</td>
      </tr>
    })
  }


  render() {
    return (
      <div className="content times">
        <p>Report</p>
        <table style={{width: '100%'}}>
          <tr>
            <td>Date</td>
            <td>Total Time</td>
            <td>Notes</td>
          </tr>
          { this.renderTimes() }
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {times: state.time.report};
}

export default connect(mapStateToProps, actions)(Feature);