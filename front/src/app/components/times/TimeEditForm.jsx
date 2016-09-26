import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/time';

import { connect } from 'react-redux'
import { Link } from 'react-router';

class TimeEditForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    if (this.props.params.timeId){
      this.props.fetchTime(this.props.params.timeId)
    }
  }

  handleFormSubmit(formProps) {
    if (this.props.params.timeId){
      this.props.updateTime(this.props.params.timeId, formProps);

    }else {
      this.props.createTime(formProps);
      this.props.fetchTimes();
    }
  }

  render() {
    const { handleSubmit, fields: { note, date, spent } } = this.props;



    return (
      <div className="form-container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className={`input-group ${note.touched && note.error ? 'has-error' : ''}`}>
            <input type="text" placeholder="Note" {...note} />
            { note.touched && <div className="form-error">{note.error}</div> }
          </div>
          <div className={`input-group ${date.touched && date.error ? 'has-error' : ''}`}>
            <input type="date" placeholder="Date" {...date} />
            { date.touched && <div className="form-error">{date.error}</div> }
          </div>
          <div className={`input-group ${spent.touched && spent.error ? 'has-error' : ''}`}>
            <input type="number" placeholder="Spent" {...spent} />
            { spent.touched && <div className="form-error">{spent.error}</div> }
          </div>
          <div>
            {
              this.props.errorMessage && this.props.errorMessage.time &&
                <div className="error-container">Oops! { this.props.errorMessage.time }</div>
            }
          </div>
          <button type="submit" className="btn">Save</button>
          <div className="form-bottom">
            <Link to="/times">Times</Link>
          </div>
        </form>
      </div>
    )
  }
}

function validate(props) {
  const errors = {};

  Object.keys(props).map(prop => {
    if(!props[prop]) {
      errors[prop] = `please enter a ${prop}`;
    }
  });

  if(props.note && props.note.length < 3) {
    errors.note = "minimum of 4 characters";
  }

  if(props.date && props.date.length > 20) {
    errors.date = "maximum of 20 characters";
  }

  if(props.spent && props.spent.length < 3) {
    errors.spent = "minimum of 4 characters";
  }
  return errors;
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
          editTime : state.time.editTime};
}

export default reduxForm({
  form: 'timeForm',
  fields: ['note', 'date', 'spent'],
  validate
}, mapStateToProps, actions)(TimeEditForm);
