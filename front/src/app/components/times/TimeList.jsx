import React, {Component} from 'react';
import * as actions from '../../actions/time';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class Feature extends Component {
  componentWillMount() {
    this.props.fetchTimes();

    this.user = JSON.parse(localStorage.getItem('access')).user;
  }

  handleRemove(item){
    this.props.deleteTime(item._id)
  }
  renderTimes() {
    const times = this.props.times || [];

    return times.map((time, i) => {
      return <tr key={time._id}>
        <td>{ time.note }</td>
        <td>{ time.date }</td>
        <td>{ time.spent }</td>
        <td><a href ={`/edit/${time._id}`}>Edit</a></td>
        <button onClick={this.handleRemove.bind(this, time)}>Delete</button>
      </tr>
    })
  }


  render() {
    return (
      <div className="content times">
        <p>Time List! :)</p>
        <Link to="/add">Add</Link>
        <table style={{width: '100%'}}>
          <tr>
            <td>Note</td>
            <td>Date</td>
            <td>Spent</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          { this.renderTimes() }
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {times: state.time.list};
}

export default connect(mapStateToProps, actions)(Feature);