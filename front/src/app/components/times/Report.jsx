import React, {Component} from 'react';
import * as actions from '../../actions/time';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import styles from './times.scss';

class Feature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateFrom : Date.now(),
      dateTo : Date.now()
    }
  }

  componentWillMount() {
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

  handleReport(){
    this.props.fetchReport(this.state.dateFrom, this.state.dateTo);
  }

  changeFrom(e){
    this.setState({ dateFrom: e.target.value }) //set state value to the input value
  }

  changeTo(e){
    this.setState({ dateTo: e.target.value }) //set state value to the input value
  }

  render() {
    return (
      <div className="content">
        <p>Report</p>
        <div className="filter">
          <input type="date" placeholder="Date From" value={this.state.dateFrom} onChange={this.changeFrom.bind(this)}/>
          <input type="date" placeholder="Date To"  value={this.state.dateTo} onChange={this.changeTo.bind(this)}/>
          <button onClick={this.handleReport.bind(this)}>Filter</button>
        </div>
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